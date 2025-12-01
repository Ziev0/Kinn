// app/assets/page.tsx
"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Plus, Trash2, Edit, Save, X } from "lucide-react"

type Asset = {
  id: string
  name: string
  category: string
  value: number
  description?: string
  status: 'verified' | 'pending' | 'needs-attention'
}

const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'Primary Residence',
    category: 'Real Estate',
    value: 350000,
    description: '123 Main Street, Los Angeles, CA 90001',
    status: 'pending'
  },
  {
    id: '2',
    name: 'Chase Checking Account',
    category: 'Bank Accounts',
    value: 15430,
    description: 'Account ending in 4392',
    status: 'verified'
  },
  {
    id: '3',
    name: 'Wells Fargo Savings',
    category: 'Bank Accounts',
    value: 48200,
    description: 'Account ending in 8821',
    status: 'verified'
  },
  {
    id: '4',
    name: '2018 Honda Accord',
    category: 'Vehicles',
    value: 8000,
    description: 'VIN: 1HGCV1F13JA123456',
    status: 'verified'
  }
]

const categories = [
  'Real Estate',
  'Bank Accounts',
  'Investment Accounts',
  'Vehicles',
  'Personal Property',
  'Other Assets'
]

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newAsset, setNewAsset] = useState({
    name: '',
    category: 'Other Assets',
    value: 0,
    description: '',
    status: 'pending' as const
  })

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0)

  const handleAddAsset = () => {
    if (!newAsset.name || newAsset.value <= 0) return

    const asset: Asset = {
      id: Date.now().toString(),
      name: newAsset.name,
      category: newAsset.category,
      value: newAsset.value,
      description: newAsset.description,
      status: newAsset.status
    }

    setAssets([...assets, asset])
    setNewAsset({
      name: '',
      category: 'Other Assets',
      value: 0,
      description: '',
      status: 'pending'
    })
    setIsAdding(false)
  }

  const handleRemoveAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id))
  }

  const handleEditAsset = (id: string) => {
    setEditingId(id)
  }

  const handleSaveEdit = (id: string, updates: Partial<Asset>) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, ...updates } : asset
    ))
    setEditingId(null)
  }

  const getStatusBadge = (status: Asset['status']) => {
    const config = {
      verified: { label: 'Verified', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
      'needs-attention': { label: 'Needs Attention', className: 'bg-red-100 text-red-800' }
    }
    const { label, className } = config[status]
    return <Badge className={className}>{label}</Badge>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Header Section */}
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-4xl px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight">
                  📊 Asset Inventory
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Simple list of estate assets - add, edit, or remove as needed
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">${totalAssets.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Assets</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Add Asset Form */}
          {isAdding && (
            <Card className="mb-6 border-2 border-dashed border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Asset
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Asset Name</Label>
                    <Input
                      id="name"
                      value={newAsset.name}
                      onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                      placeholder="e.g., Primary Residence, Bank Account"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={newAsset.category}
                      onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="value">Value ($)</Label>
                    <Input
                      id="value"
                      type="number"
                      value={newAsset.value}
                      onChange={(e) => setNewAsset({ ...newAsset, value: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={newAsset.status}
                      onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value as Asset['status'] })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="needs-attention">Needs Attention</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    value={newAsset.description}
                    onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                    placeholder="Additional details about the asset"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleAddAsset} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Add Asset
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Assets List */}
          <div className="space-y-4">
            {assets.map((asset) => (
              <Card key={asset.id}>
                <CardContent className="p-6">
                  {editingId === asset.id ? (
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Asset Name</Label>
                          <Input
                            value={asset.name}
                            onChange={(e) => handleSaveEdit(asset.id, { name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <select
                            value={asset.category}
                            onChange={(e) => handleSaveEdit(asset.id, { category: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Value ($)</Label>
                          <Input
                            type="number"
                            value={asset.value}
                            onChange={(e) => handleSaveEdit(asset.id, { value: Number(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <select
                            value={asset.status}
                            onChange={(e) => handleSaveEdit(asset.id, { status: e.target.value as Asset['status'] })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="needs-attention">Needs Attention</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={asset.description || ''}
                          onChange={(e) => handleSaveEdit(asset.id, { description: e.target.value })}
                          placeholder="Additional details"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => setEditingId(null)} className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditingId(null)}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{asset.name}</h3>
                          {getStatusBadge(asset.status)}
                        </div>
                        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{asset.category}</span>
                          <span>•</span>
                          <span className="font-semibold text-green-600">
                            ${asset.value.toLocaleString()}
                          </span>
                          {asset.description && (
                            <>
                              <span>•</span>
                              <span>{asset.description}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAsset(asset.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveAsset(asset.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Empty State */}
            {assets.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <p className="text-lg">No assets added yet</p>
                    <p className="mt-2">Start by adding your first asset</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Add Asset Button */}
            {!isAdding && (
              <Button
                onClick={() => setIsAdding(true)}
                className="w-full"
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            )}
          </div>

          {/* Quick Stats */}
          {assets.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Quick Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{assets.length}</p>
                    <p className="text-sm text-muted-foreground">Total Assets</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ${totalAssets.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">
                      {assets.filter(a => a.status === 'verified').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Verified Assets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}