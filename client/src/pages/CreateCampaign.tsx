import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, DollarSign, User, FileText, Loader2 } from 'lucide-react';
import { useStateContext } from '../context';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
import { FormField, FormLabel, FormMessage } from '../components/ui/Form';

const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const result = await createCampaign({ 
        ...form, 
        target: form.target 
      });
      
      if (result.success) {
        navigate('/');
      } else {
        console.error('Failed to create campaign:', result.error);
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <Card variant="elevated" className="p-8 text-center max-w-md mx-4">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Loader2 className="w-12 h-12 animate-spin text-purple-500" />
                <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-purple-500/20"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Creating Your Campaign</h3>
            <p className="text-gray-400 mb-4">Please wait while we deploy your campaign to the blockchain...</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Processing transaction</span>
            </div>
          </Card>
        </div>
      )}

      {/* Hero Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-purple-300 font-medium">Campaign Creation</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Launch Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Vision
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transform your innovative ideas into reality with blockchain-powered crowdfunding
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Creator Info Card */}
              <Card variant="elevated" className="border-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Campaign Creator</h3>
                      <p className="text-gray-400 text-sm">Tell us about yourself</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField>
                      <FormLabel required>Your Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={(e) => handleFormFieldChange('name', e)}
                        required
                        variant="filled"
                        className="bg-gray-800/50 border-gray-600/50 focus:border-purple-500"
                      />
                    </FormField>
                    <FormField>
                      <FormLabel required>Campaign Title</FormLabel>
                      <Input
                        type="text"
                        placeholder="Give your campaign a compelling title"
                        value={form.title}
                        onChange={(e) => handleFormFieldChange('title', e)}
                        required
                        variant="filled"
                        className="bg-gray-800/50 border-gray-600/50 focus:border-purple-500"
                      />
                    </FormField>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details Card */}
              <Card variant="elevated" className="border-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Project Details</h3>
                      <p className="text-gray-400 text-sm">Describe your campaign</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <FormField>
                      <FormLabel required>Campaign Story</FormLabel>
                      <TextArea
                        placeholder="Tell your story... What problem are you solving? Why do you need funding? What impact will this create?"
                        value={form.description}
                        onChange={(e) => handleFormFieldChange('description', e)}
                        required
                        variant="filled"
                        className="min-h-[140px] bg-gray-800/50 border-gray-600/50 focus:border-blue-500 resize-none"
                      />
                      <FormMessage>A compelling story attracts more supporters. Be specific about your goals and impact.</FormMessage>
                    </FormField>

                    <FormField>
                      <FormLabel required>Campaign Image URL</FormLabel>
                      <Input
                        type="url"
                        placeholder="https://example.com/your-campaign-image.jpg"
                        value={form.image}
                        onChange={(e) => handleFormFieldChange('image', e)}
                        required
                        variant="filled"
                        className="bg-gray-800/50 border-gray-600/50 focus:border-blue-500"
                      />
                      <FormMessage>Use a high-quality image (1200x600px recommended) that represents your campaign</FormMessage>
                    </FormField>
                  </div>
                </CardContent>
              </Card>

              {/* Funding Goals Card */}
              <Card variant="elevated" className="border-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Funding Goals</h3>
                      <p className="text-gray-400 text-sm">Set your financial targets</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField>
                      <FormLabel required>Funding Goal (ETH)</FormLabel>
                      <Input
                        type="number"
                        step="0.001"
                        min="0.001"
                        placeholder="0.500"
                        value={form.target}
                        onChange={(e) => handleFormFieldChange('target', e)}
                        required
                        variant="filled"
                        className="bg-gray-800/50 border-gray-600/50 focus:border-green-500"
                      />
                      <FormMessage>Set a realistic goal based on your project needs</FormMessage>
                    </FormField>
                    <FormField>
                      <FormLabel required>Campaign End Date</FormLabel>
                      <Input
                        type="date"
                        value={form.deadline}
                        onChange={(e) => handleFormFieldChange('deadline', e)}
                        required
                        variant="filled"
                        className="bg-gray-800/50 border-gray-600/50 focus:border-green-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <FormMessage>Choose an end date that gives you enough time to reach your goal</FormMessage>
                    </FormField>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview & Info */}
            <div className="space-y-6">
              {/* Preview Card */}
              <Card variant="elevated" className="border-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl sticky top-24">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Campaign Preview</h4>
                  
                  {form.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={form.image} 
                        alt="Campaign preview" 
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Title</p>
                      <p className="text-white font-medium">
                        {form.title || "Your campaign title will appear here"}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Goal</p>
                      <p className="text-green-400 font-semibold">
                        {form.target ? `${form.target} ETH` : "0.000 ETH"}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Creator</p>
                      <p className="text-gray-300">
                        {form.name || "Your name"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Cards */}
              <Card variant="gradient" className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">100% Transparent</h4>
                  <p className="text-green-200 text-sm">All funds raised go directly to you. No hidden fees or intermediaries.</p>
                </CardContent>
              </Card>

              <Card variant="outline" className="border-purple-500/20 bg-purple-500/5">
                <CardContent className="p-6">
                  <h4 className="text-white font-semibold mb-3">Tips for Success</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Write a compelling story that connects with supporters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use high-quality images and clear descriptions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Set realistic and achievable funding goals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Share your campaign on social media</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Section */}
          <div className="text-center pt-8">
            <Button
              type="submit"
              disabled={isLoading}
              size="xl"
              className="min-w-[240px] group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Deploying to Blockchain...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Launch My Campaign
                </>
              )}
            </Button>
            
            <p className="text-gray-400 text-sm mt-4">
              By launching your campaign, you agree to our terms and the blockchain transaction will be processed.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;