'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function WaitlistPage() {
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // Try to get state from sessionStorage
    const storedAnswers = sessionStorage.getItem('quizAnswers');
    if (storedAnswers) {
      const answers = JSON.parse(storedAnswers);
      if (answers.q7) {
        setState(answers.q7);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to waitlist API
    alert('Thank you! We\'ll notify you when we launch in your state.');
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            We're not in {state || 'your state'} yet... but we will be soon!
          </h1>
        </section>

        {/* Waitlist Form */}
        <section className="mb-12">
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Join the waitlist</CardTitle>
              <p className="text-muted-foreground">
                We're expanding to {state || 'your state'} soon. Be the first to know.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Notify Me When You Launch
                </Button>
              </form>
              <div className="mt-6 p-4 bg-accent rounded-lg text-center">
                <p className="font-semibold">Early bird special: $500 off when we launch in your state</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Helpful Resources */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">In the meantime...</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Download Our Free Probate Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get our comprehensive guide to probate in {state || 'your state'}.
                </p>
                <Button variant="outline" className="w-full">
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Find a Probate Attorney</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We've curated a list of vetted attorneys in {state || 'your state'}.
                </p>
                <Button variant="outline" className="w-full">
                  See Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
