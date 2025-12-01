// components/IntakeForm/IntakeForm.tsx
'use client';

import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// =============================================================================
// TYPES AND INTERFACES
// =============================================================================

export interface IntakeFormData {
  // Step 1: Your Information
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhone: string;
  relationship: string;
  relationshipOther?: string;

  // Step 2: About Loved One
  lovedOneFirstName: string;
  lovedOneMiddleName: string;
  lovedOneLastName: string;
  dateOfPassing: string;
  passingCity: string;
  passingState: string;
  homeAddress: string;
  homeCity: string;
  homeState: string;
  homeZip: string;
  dateOfBirth: string;

  // Step 3: The Will
  hasWill: string;
  willLocation?: string;
  willFile?: File;

  // Step 4: Assets
  estateValue: string;
  ownsRealEstate: string;
  properties: Array<{
    address: string;
    estimatedValue: string;
    mortgageBalance: string;
  }>;
  assetTypes: string[];
  bankAccounts: {
    banks: string[];
    otherBank?: string;
    totalBalance: string;
  };

  // Step 5: Debts
  hasDebts: string;
  debtTypes: string[];
  totalDebt: string;

  // Step 6: Beneficiaries
  beneficiaries: Array<{
    name: string;
    relationship: string;
    email?: string;
    phone?: string;
  }>;
  hasMinorChildren: string;
  beneficiaryAgreement: string;

  // Step 7: Documents
  availableDocuments: string[];
  uploadedFiles: File[];

  // Step 8: Timeline & Goals
  timeline: string;
  concern: string;
  otherConcern?: string;
}

interface AnalyticsEvent {
  type: string;
  timestamp: Date;
  step?: number;
  stepName?: string;
  fieldName?: string;
  value?: any;
  sessionId: string;
  deviceType: string;
}

interface AnalyticsContextType {
  trackEvent: (event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId' | 'deviceType'>) => void;
  trackStepView: (step: number, stepName: string) => void;
  trackFieldInteraction: (fieldName: string, type: 'focus' | 'blur' | 'change', value?: any) => void;
  trackFormStart: () => void;
  trackFormComplete: () => void;
  trackFormAbandon: () => void;
}

// =============================================================================
// ANALYTICS CONTEXT
// =============================================================================

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const formStartTime = useRef<Date | null>(null);
  const stepStartTime = useRef<Date | null>(null);
  const currentStep = useRef<number>(0);
  const fieldInteractions = useRef<Map<string, { focus: Date | null; changes: number }>>(new Map());
  const formDataSnapshot = useRef<any>({});

  const getDeviceType = () => {
    if (typeof window === 'undefined') return 'desktop';
    
    const userAgent = navigator.userAgent;
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      return 'mobile';
    } else if (/(Tablet|iPad|PlayBook|Silk)/.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  };

  const sendToAnalytics = async (event: AnalyticsEvent) => {
    console.log('📊 Analytics Event:', event);
    
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.warn('Failed to send analytics:', error);
    }
  };

  const trackEvent = (event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId' | 'deviceType'>) => {
    sendToAnalytics({
      ...event,
      timestamp: new Date(),
      sessionId: sessionId.current,
      deviceType: getDeviceType(),
    });
  };

  const trackStepView = (step: number, stepName: string) => {
    if (stepStartTime.current && currentStep.current !== step) {
      const timeSpent = new Date().getTime() - stepStartTime.current.getTime();
      trackEvent({
        type: 'step_completed',
        step: currentStep.current,
        stepName,
        value: timeSpent,
      });
    }

    stepStartTime.current = new Date();
    currentStep.current = step;

    trackEvent({
      type: 'step_viewed',
      step,
      stepName,
    });
  };

  const trackFieldInteraction = (fieldName: string, type: 'focus' | 'blur' | 'change', value?: any) => {
    const now = new Date();
    
    if (!fieldInteractions.current.has(fieldName)) {
      fieldInteractions.current.set(fieldName, { focus: null, changes: 0 });
    }

    const fieldData = fieldInteractions.current.get(fieldName)!;

    if (type === 'focus') {
      fieldData.focus = now;
    } else if (type === 'blur' && fieldData.focus) {
      const timeSpent = now.getTime() - fieldData.focus.getTime();
      trackEvent({
        type: 'field_time_spent',
        fieldName,
        value: timeSpent,
      });
    } else if (type === 'change') {
      fieldData.changes += 1;
      
      trackEvent({
        type: 'field_edit',
        fieldName,
        value: fieldData.changes,
      });

      if (formDataSnapshot.current[fieldName] !== undefined && formDataSnapshot.current[fieldName] !== value) {
        trackEvent({
          type: 'field_value_changed',
          fieldName,
          value: { from: formDataSnapshot.current[fieldName], to: value },
        });
      }
      
      formDataSnapshot.current[fieldName] = value;
    }
  };

  const trackFormStart = () => {
    formStartTime.current = new Date();
    trackEvent({ type: 'form_started' });
  };

  const trackFormComplete = () => {
    if (formStartTime.current) {
      const totalTime = new Date().getTime() - formStartTime.current.getTime();
      trackEvent({
        type: 'form_completed',
        value: totalTime,
      });
    }
  };

  const trackFormAbandon = () => {
    if (formStartTime.current) {
      const timeToAbandon = new Date().getTime() - formStartTime.current.getTime();
      trackEvent({
        type: 'form_abandoned',
        step: currentStep.current,
        value: timeToAbandon,
      });
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      trackFormAbandon();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <AnalyticsContext.Provider value={{
      trackEvent,
      trackStepView,
      trackFieldInteraction,
      trackFormStart,
      trackFormComplete,
      trackFormAbandon,
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

// =============================================================================
// PROGRESS BAR COMPONENT
// =============================================================================

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  const minutesLeft = Math.max(1, Math.round((totalSteps - currentStep) * 1.5));

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>~{minutesLeft} minutes left</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// =============================================================================
// ANALYTICS INPUT COMPONENT
// =============================================================================

interface AnalyticsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  step: number;
}

const AnalyticsInput: React.FC<AnalyticsInputProps> = ({ 
  name, 
  label, 
  step, 
  onChange,
  onFocus,
  onBlur,
  ...props 
}) => {
  const { trackFieldInteraction, trackEvent } = useAnalytics();

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    trackFieldInteraction(name, 'focus');
    trackEvent({
      type: 'field_focused',
      fieldName: name,
      step,
    });
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    trackFieldInteraction(name, 'blur');
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackFieldInteraction(name, 'change', e.target.value);
    onChange?.(e);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        {...props}
      />
    </div>
  );
};

// =============================================================================
// FORM STEP COMPONENTS
// =============================================================================

// Welcome Screen
interface WelcomeScreenProps {
  nextStep: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ nextStep }) => {
  return (
    <div className="text-center">
      <div className="border-b-2 border-border pb-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome to Kinn Consultancy
        </h1>
      </div>

      <div className="space-y-4 text-foreground mb-8">
        <p className="text-lg">
          We're here to help you settle your loved one's estate without the stress, 
          delays, and $15,000 lawyer fees.
        </p>

        <p>This takes 10-15 minutes. We'll ask about:</p>
        
        <ul className="text-left max-w-md mx-auto space-y-2">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Your loved one's passing
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Assets and debts
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Beneficiaries and heirs
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Your relationship to the deceased
          </li>
        </ul>

        <p className="text-sm text-muted-foreground">
          Everything is encrypted and confidential.
        </p>
      </div>

      <button
        onClick={nextStep}
        className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors"
      >
        Let's Begin →
      </button>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Need help? Call us: <span className="font-semibold">(555) 123-4567</span>
        </p>
      </div>
    </div>
  );
};

// Your Information Step
interface YourInformationProps {
  data: Partial<IntakeFormData>;
  updateData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const YourInformation: React.FC<YourInformationProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const [step, setStep] = useState(0);
  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm({
    defaultValues: {
      userFirstName: data.userFirstName || '',
      userLastName: data.userLastName || '',
      userEmail: data.userEmail || '',
      userPhone: data.userPhone || '',
      relationship: data.relationship || '',
      relationshipOther: data.relationshipOther || '',
    }
  });
  const { trackFieldInteraction } = useAnalytics();

  // Helper to merge react-hook-form handlers with analytics tracking
  const registerWithTracking = (name: 'userFirstName' | 'userLastName' | 'userEmail' | 'userPhone' | 'relationship' | 'relationshipOther', options?: any) => {
    const { onChange, onBlur, ...rest } = register(name, options);
    return {
      ...rest,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        trackFieldInteraction(name, 'change', e.target.value);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur(e);
        trackFieldInteraction(name, 'blur');
      },
      onFocus: () => {
        trackFieldInteraction(name, 'focus');
      },
    };
  };

  const steps = [
    {
      title: "First, tell us about you.",
      question: "What's your name?",
      fields: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              First Name
            </label>
            <input
              type="text"
              {...registerWithTracking('userFirstName', { required: 'First name is required' })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.userFirstName && (
              <p className="text-destructive text-sm mt-1">{errors.userFirstName.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...registerWithTracking('userLastName', { required: 'Last name is required' })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.userLastName && (
              <p className="text-destructive text-sm mt-1">{errors.userLastName.message as string}</p>
            )}
          </div>
        </div>
      )
    },
    {
      title: "What's your email address?",
      fields: (
        <div>
          <input
            type="email"
            {...registerWithTracking('userEmail', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.userEmail && (
            <p className="text-destructive text-sm mt-1">{errors.userEmail.message as string}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            We'll send updates here about your case.
          </p>
        </div>
      )
    },
    {
      title: "What's your phone number?",
      fields: (
        <div>
          <input
            type="tel"
            {...registerWithTracking('userPhone', { required: 'Phone number is required' })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.userPhone && (
            <p className="text-destructive text-sm mt-1">{errors.userPhone.message as string}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            In case we need to reach you quickly.
          </p>
        </div>
      )
    },
    {
      title: "What's your relationship to the deceased?",
      fields: (
        <div className="space-y-3">
          {['Spouse', 'Child', 'Sibling', 'Parent', 'Other family member', 'Friend', 'Named executor/administrator'].map((relation) => (
            <label key={relation} className="flex items-center">
              <input
                type="radio"
                value={relation}
                {...registerWithTracking('relationship', { required: 'Relationship is required' })}
                className="mr-3"
              />
              <span>{relation}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              value="Other"
              {...registerWithTracking('relationship')}
              className="mr-3"
            />
            <span>Other: </span>
            <input
              type="text"
              {...registerWithTracking('relationshipOther')}
              className="ml-2 px-2 py-1 border border-input rounded flex-1 bg-background text-foreground"
              placeholder="Please specify"
            />
          </label>
          {errors.relationship && (
            <p className="text-destructive text-sm mt-1">{errors.relationship.message as string}</p>
          )}
          <p className="text-sm text-primary mt-3">
            Why this matters: Determines legal standing to petition for probate.
          </p>
        </div>
      )
    }
  ];

  const onSubmit = async (formData: any) => {
    updateData(formData);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      nextStep();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only validate fields for the current step
    let fieldsToValidate: ('userFirstName' | 'userLastName' | 'userEmail' | 'userPhone' | 'relationship')[] = [];
    if (step === 0) {
      fieldsToValidate = ['userFirstName', 'userLastName'];
    } else if (step === 1) {
      fieldsToValidate = ['userEmail'];
    } else if (step === 2) {
      fieldsToValidate = ['userPhone'];
    } else if (step === 3) {
      fieldsToValidate = ['relationship'];
    }

    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      const formValues = getValues();
      onSubmit(formValues);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          {steps[step].title}
        </h2>
        {step === 0 && (
          <p className="text-muted-foreground mb-4">{steps[step].question}</p>
        )}
        {steps[step].fields}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={step > 0 ? () => setStep(step - 1) : prevStep}
          className="px-6 py-2 text-muted-foreground border border-input rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          {step < steps.length - 1 ? 'Continue →' : 'Complete Step 1'}
        </button>
      </div>
    </form>
  );
};

// About Loved One Step
interface AboutLovedOneProps {
  data: Partial<IntakeFormData>;
  updateData: (data: Partial<IntakeFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const AboutLovedOne: React.FC<AboutLovedOneProps> = ({
  data,
  updateData,
  nextStep,
  prevStep,
}) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      lovedOneFirstName: data.lovedOneFirstName || '',
      lovedOneMiddleName: data.lovedOneMiddleName || '',
      lovedOneLastName: data.lovedOneLastName || '',
      dateOfPassing: data.dateOfPassing || '',
    }
  });
  const { trackFieldInteraction } = useAnalytics();
  
  const lovedOneFirstName = watch('lovedOneFirstName') || data.lovedOneFirstName;

  // Helper to merge react-hook-form handlers with analytics tracking
  const registerWithTracking = (name: 'lovedOneFirstName' | 'lovedOneMiddleName' | 'lovedOneLastName' | 'dateOfPassing', options?: any) => {
    const { onChange, onBlur, ...rest } = register(name, options);
    return {
      ...rest,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        trackFieldInteraction(name, 'change', e.target.value);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur(e);
        trackFieldInteraction(name, 'blur');
      },
      onFocus: () => {
        trackFieldInteraction(name, 'focus');
      },
    };
  };

  const onSubmit = (formData: any) => {
    updateData(formData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          What was your loved one's full legal name?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="lovedOneFirstName" className="block text-sm font-medium text-foreground mb-1">
              First Name
            </label>
            <input
              id="lovedOneFirstName"
              type="text"
              required
              {...registerWithTracking('lovedOneFirstName', { required: 'First name is required' })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.lovedOneFirstName && (
              <p className="text-destructive text-sm mt-1">{errors.lovedOneFirstName.message as string}</p>
            )}
          </div>
          <div>
            <label htmlFor="lovedOneMiddleName" className="block text-sm font-medium text-foreground mb-1">
              Middle Name
            </label>
            <input
              id="lovedOneMiddleName"
              type="text"
              {...registerWithTracking('lovedOneMiddleName')}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="lovedOneLastName" className="block text-sm font-medium text-foreground mb-1">
              Last Name
            </label>
            <input
              id="lovedOneLastName"
              type="text"
              required
              {...registerWithTracking('lovedOneLastName', { required: 'Last name is required' })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.lovedOneLastName && (
              <p className="text-destructive text-sm mt-1">{errors.lovedOneLastName.message as string}</p>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          (As it appears on their driver's license or other legal documents)
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          When did {lovedOneFirstName || 'your loved one'} pass away?
        </h2>
        <div>
          <label htmlFor="dateOfPassing" className="block text-sm font-medium text-foreground mb-1">
            Date of Passing
          </label>
          <input
            id="dateOfPassing"
            type="date"
            required
            {...registerWithTracking('dateOfPassing', { required: 'Date of passing is required' })}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {errors.dateOfPassing && (
            <p className="text-destructive text-sm mt-1">{errors.dateOfPassing.message as string}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 text-muted-foreground border border-input rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Continue →
        </button>
      </div>
    </form>
  );
};

// Pricing & Quote Step
interface PricingQuoteProps {
  data: Partial<IntakeFormData>;
  nextStep: () => void;
  prevStep: () => void;
}

const PricingQuote: React.FC<PricingQuoteProps> = ({ data, nextStep, prevStep }) => {
  const { trackEvent } = useAnalytics();

  const calculateQuote = () => {
    const estateValue = data.estateValue;
    
    if (!estateValue) return { price: null, complexity: 'Unknown' };
    
    if (estateValue === 'Under $50,000' || estateValue === '$50,000 - $150,000') {
      return { price: 999, complexity: 'Simple' };
    } else if (estateValue === '$150,000 - $500,000') {
      return { price: 1999, complexity: 'Standard' };
    } else if (estateValue === '$500,000 - $1,000,000') {
      return { price: 2999, complexity: 'Complex' };
    } else {
      return { price: 'custom', complexity: 'High Complexity' };
    }
  };

  const quote = calculateQuote();

  const handleContinue = () => {
    trackEvent({
      type: 'quote_viewed',
      step: 9,
      stepName: 'Pricing & Quote',
      value: quote.price
    });
    nextStep();
  };

  if (quote.price === 'custom') {
    return (
      <div className="text-center">
        <div className="border-b-2 border-border pb-4 mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            Your Estimated Quote
          </h1>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-lg text-foreground">
            Based on the estate size and complexity, we recommend a custom quote.
          </p>
          <p className="text-muted-foreground">
            Our team will provide you with a personalized estimate after reviewing your case details.
          </p>
        </div>

        <div className="bg-muted rounded-lg p-6 mb-6">
          <h3 className="font-semibold mb-4">What's included in our service:</h3>
          <ul className="text-left space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Court petition preparation & filing
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Asset inventory & appraisal
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Creditor claim management
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Final distribution documents
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Dedicated case manager
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              24/7 online dashboard access
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Unlimited email support
            </li>
          </ul>
        </div>

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-2 text-muted-foreground border border-input rounded-md hover:bg-accent hover:text-accent-foreground"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Continue to Contact →
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Questions? Call us: <span className="font-semibold">(555) 123-4567</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="border-b-2 border-border pb-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Your Estimated Quote
        </h1>
      </div>

      <div className="space-y-6">
        <div className="bg-muted rounded-lg p-6">
          <p className="text-sm text-muted-foreground mb-2">Based on what you've told us:</p>
          
          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <p className="font-semibold">Estate Size</p>
              <p className="text-muted-foreground">{data.estateValue}</p>
            </div>
            <div>
              <p className="font-semibold">Complexity</p>
              <p className="text-muted-foreground">{quote.complexity}</p>
            </div>
            <div>
              <p className="font-semibold">Timeline</p>
              <p className="text-muted-foreground">6-9 months</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg">Your Kinn Price:</span>
              <span className="text-2xl font-bold text-accent">${quote.price}</span>
            </div>
            <div className="border-b border-border mb-2"></div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Traditional Attorney:</span>
              <span>$12,000 - $18,000</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-accent mt-2">
              <span>You save:</span>
              <span>~${12000 - (quote.price as number)} 💰</span>
            </div>
          </div>
        </div>

        <div className="text-left">
          <h3 className="font-semibold mb-3">What's included:</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Court petition preparation & filing
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Asset inventory & appraisal
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Creditor claim management
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Final distribution documents
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Dedicated case manager
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              24/7 online dashboard access
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Unlimited email support
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={prevStep}
          className="px-6 py-2 text-muted-foreground border border-input rounded-md hover:bg-accent hover:text-accent-foreground"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Continue to Payment →
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Questions? Call us: <span className="font-semibold">(555) 123-4567</span>
        </p>
      </div>
    </div>
  );
};

// Confirmation Step
interface ConfirmationProps {
  data: Partial<IntakeFormData>;
}

const Confirmation: React.FC<ConfirmationProps> = ({ data }) => {
  return (
    <div className="text-center">
      <div className="border-b-2 border-border pb-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome to Kinn, {data.userFirstName}!
        </h1>
      </div>

      <div className="space-y-6 text-left max-w-md mx-auto">
        <p className="text-lg text-foreground">
          Your probate case has been started.
        </p>

        <div>
          <h3 className="font-semibold mb-3">What happens next:</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>
                <strong>TODAY:</strong> You'll receive a confirmation 
                email with login details to your dashboard.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>
                <strong>WITHIN 24 HOURS:</strong> Your case manager 
                will call to introduce themselves.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>
                <strong>WITHIN 3 DAYS:</strong> We'll send you a 
                personalized checklist of documents we need.
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>
                <strong>WEEK 1:</strong> We'll prepare and file your 
                petition with the court.
              </span>
            </li>
          </ol>
        </div>
      </div>

      <button className="w-full mt-8 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors">
        Go to Your Dashboard →
      </button>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Questions? Call us anytime: <span className="font-semibold">(555) 123-4567</span>
        </p>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN INTAKE FORM COMPONENT
// =============================================================================

const IntakeForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<IntakeFormData>>({});
  const { trackStepView, trackFormStart, trackFormComplete } = useAnalytics();

  const steps = [
    { component: WelcomeScreen, title: 'Welcome' },
    { component: YourInformation, title: 'Your Information' },
    { component: AboutLovedOne, title: 'About Your Loved One' },
    { component: PricingQuote, title: 'Pricing & Quote' },
    { component: Confirmation, title: 'Confirmation' },
  ];

  useEffect(() => {
    if (currentStep === 1) {
      trackFormStart();
    }
  }, [currentStep, trackFormStart]);

  useEffect(() => {
    if (currentStep > 0 && currentStep < steps.length - 1) {
      trackStepView(currentStep, steps[currentStep].title);
    }
  }, [currentStep, trackStepView]);

  const updateFormData = (data: Partial<IntakeFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      trackFormComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={steps.length - 1} 
          />
        )}
        
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 sm:p-8">
          <CurrentStepComponent
            data={formData}
            updateData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
      </div>
    </div>
  );
};

// =============================================================================
// EXPORT WITH ANALYTICS PROVIDER
// =============================================================================

const IntakeFormWithAnalytics: React.FC = () => {
  return (
    <AnalyticsProvider>
      <IntakeForm />
    </AnalyticsProvider>
  );
};

export default IntakeFormWithAnalytics;
