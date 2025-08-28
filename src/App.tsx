import React, { useState } from 'react';
import { Rocket, Shield, FileText, Sparkles, CheckCircle, Upload, Mail, User, Building, Lock, ArrowRight, Phone, Briefcase } from 'lucide-react';

interface FormData {
  companyName: string;
  industryType: string;
  representativeName: string;
  representativePhone: string;
  companyEmail: string;
  password: string;
  verificationCode: string;
  agreeToTerms: boolean;
}

interface UploadedFile {
  name: string;
  type: string;
  uploaded: boolean;
}

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industryType: '',
    representativeName: '',
    representativePhone: '',
    companyEmail: 'tech@odela.com.my',
    password: '',
    verificationCode: '',
    agreeToTerms: false
  });
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { name: 'Audited Financial Statements', type: 'financial', uploaded: false },
    { name: 'CTOS Business Profile', type: 'registration', uploaded: false },
    { name: 'SSM Registration Document', type: 'business-plan', uploaded: false }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const steps = [
    { number: 1, title: 'First Deal', icon: Rocket, description: 'Join the Game' },
    { number: 2, title: 'Card Check', icon: Shield, description: 'Verify Your Hand' },
    { number: 3, title: 'SPOT Draw', icon: FileText, description: 'Submit Your Cards' },
    { number: 4, title: 'SPOT Play', icon: Sparkles, description: 'Reveal Your Hand' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: field === 'agreeToTerms' ? value === 'true' : value 
    }));
  };

  const handleFileUpload = (fileType: string) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.type === fileType ? { ...file, uploaded: true } : file
      )
    );
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const allFilesUploaded = uploadedFiles.every(file => file.uploaded);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const renderProgressBar = () => (
    <div className="w-full max-w-6xl mx-auto mb-16 px-4">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex flex-col items-center relative z-10 flex-1">

              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ease-out transform ${
                isActive 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl scale-110 animate-pulse' 
                  : isCompleted 
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-200 text-gray-400 shadow-sm'
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-7 h-7" />
                ) : (
                  <Icon className="w-7 h-7" />
                )}
              </div>
              <div className="text-center max-w-32">
                <p className={`text-sm font-bold mb-1 transition-colors duration-300 ${
                  isActive 
                    ? 'text-orange-600' 
                    : isCompleted 
                      ? 'text-orange-700' 
                      : 'text-gray-400'
                }`}>
                  Round {step.number}: {step.title}
                </p>
                <p className="text-xs text-gray-500 leading-tight">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-full mb-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <Rocket className="w-14 h-14 text-white" />
        </div>
        <h1 className="text-5xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          Enter the
          <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Growth Game!
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          We'll deal you through four simple rounds to get your personalized SPOT Analysis and winning strategy for sustainable growth.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wide">
              <Building className="w-5 h-5 mr-3 text-orange-500" />
              Company Name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
              placeholder="Enter your company name"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wide">
              <Briefcase className="w-5 h-5 mr-3 text-orange-500" />
              Industry Type
            </label>
            <select
              value={formData.industryType}
              onChange={(e) => handleInputChange('industryType', e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300 bg-white"
            >
              <option value="" disabled>Select your industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="education">Education</option>
              <option value="consulting">Consulting</option>
              <option value="real-estate">Real Estate</option>
              <option value="food-beverage">Food & Beverage</option>
              <option value="transportation">Transportation</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wide">
              <User className="w-5 h-5 mr-3 text-orange-500" />
              Representative Name
            </label>
            <input
              type="text"
              value={formData.representativeName}
              onChange={(e) => handleInputChange('representativeName', e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wide">
              <Phone className="w-5 h-5 mr-3 text-orange-500" />
              Representative Phone Number
            </label>
            <input
              type="tel"
              value={formData.representativePhone}
              onChange={(e) => handleInputChange('representativePhone', e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
              placeholder="Enter your phone number (e.g., 0123456789)"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wide">
              <Mail className="w-5 h-5 mr-3 text-blue-500" />
              Company Email
            </label>
            <input
              type="email"
              value={formData.companyEmail}
              onChange={(e) => handleInputChange('companyEmail', e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
              placeholder="tech@odela.com.my"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center text-sm font-bold text-gray-700 uppercase tracking-wide">
              <Lock className="w-5 h-5 mr-3 text-orange-500" />
              Set Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 text-lg placeholder-gray-400 hover:border-gray-300"
              placeholder="••••••••••••••"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-start text-sm font-bold text-gray-700 tracking-wide">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked.toString())}
                className="w-5 h-5 mr-3 mt-0.5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              I agree to the terms and conditions
            </label>
          </div>

          <button
            onClick={handleNextStep}
            className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-5 px-8 rounded-2xl font-bold text-xl hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center group"
          >
            Get Started
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="max-w-2xl mx-auto text-center px-4">
      <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-full mb-10 shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <Shield className="w-14 h-14 text-white" />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
        Check Your Inbox to
        <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Verify Your Hand!
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
        We've dealt a secure verification card to{' '}
        <span className="font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
          {formData.companyEmail}
        </span>
        . Click it to verify your hand and get ready for the next round.
      </p>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100 mb-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
              Or enter verification code manually:
            </label>
            <input
              type="text"
              value={formData.verificationCode}
              onChange={(e) => handleInputChange('verificationCode', e.target.value)}
              className="w-full px-6 py-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 text-center text-3xl font-mono tracking-widest placeholder-gray-300 hover:border-gray-300"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-lg">
              Resend Email
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl"
            >
              Verify & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-full mb-10 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <FileText className="w-14 h-14 text-white" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
          Upload your Files
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
          To generate your detailed SPOT Analysis, please submit the following cards from your business deck. Each card reveals part of your winning strategy!
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {uploadedFiles.map((file, index) => (
          <div key={file.type} className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto transition-all duration-500 ${
              file.uploaded 
                ? 'bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg'
            }`}>
              {file.uploaded ? (
                <CheckCircle className="w-10 h-10 text-white" />
              ) : (
                <Upload className="w-10 h-10 text-gray-400" />
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center leading-tight">{file.name}</h3>
            
            {!file.uploaded ? (
              <div 
                className="border-3 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 cursor-pointer group"
                onClick={() => handleFileUpload(file.type)}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300" />
                <p className="text-lg text-gray-600 font-semibold group-hover:text-orange-600">Click to upload</p>
                <p className="text-sm text-gray-500 mt-2">or drag & drop</p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="text-lg text-green-700 font-bold">Upload Complete!</p>
                <p className="text-sm text-green-600 mt-1">File uploaded successfully</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleNextStep}
          disabled={!allFilesUploaded}
          className={`px-16 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform ${
            allFilesUploaded
              ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-3xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-lg'
          }`}
        >
          {allFilesUploaded ? (
            <>
              Continue to Analysis
              <ArrowRight className="w-6 h-6 ml-3 inline" />
            </>
          ) : (
            `Upload ${uploadedFiles.filter(f => !f.uploaded).length} More Files`
          )}
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="max-w-4xl mx-auto text-center px-4">

      {!isAnalyzing && analysisProgress === 0 ? (
        <>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Ready for the
            <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              SPOT Showdown!
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-16 leading-relaxed max-w-3xl mx-auto">
            All your cards have been played. We're ready to analyze your hand and reveal your personalized SPOT winning strategy.
          </p>
          <button
            onClick={startAnalysis}
            className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-6 px-16 rounded-2xl font-bold text-2xl hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl"
          >
            Start Analysis
          </button>
        </>
      ) : analysisProgress < 100 ? (
        <>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
            Cards in Play:
            <span className="block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Your SPOT Hand is Being Dealt!
            </span>
          </h1>
          
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 mb-8">
            <div className="w-40 h-40 mx-auto mb-12 relative">
              <div className="absolute inset-0 border-8 border-gray-200 rounded-full"></div>
              <div 
                className="absolute inset-0 border-8 border-transparent border-t-orange-500 rounded-full animate-spin"
                style={{
                  background: `conic-gradient(from 0deg, #F97316 ${analysisProgress * 3.6}deg, transparent ${analysisProgress * 3.6}deg)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-black text-gray-700">{analysisProgress}%</span>
              </div>
            </div>

            <div className="space-y-6 text-left max-w-lg mx-auto">
              {[
                { text: 'Dealing your financial cards...', threshold: 0 },
                { text: 'Shuffling market opportunities...', threshold: 25 },
                { text: 'Building your winning hand...', threshold: 50 },
                { text: 'Preparing your ace strategy...', threshold: 75 }
              ].map((step, index) => (
                <div key={index} className={`flex items-center transition-all duration-500 p-4 rounded-2xl ${
                  analysisProgress >= step.threshold 
                    ? 'opacity-100 bg-orange-50 border-2 border-orange-200' 
                    : 'opacity-40 bg-gray-50 border-2 border-gray-200'
                }`}>
                  {analysisProgress >= step.threshold + 25 ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                  ) : (
                    <div className="w-6 h-6 border-3 border-orange-500 border-t-transparent rounded-full animate-spin mr-4 flex-shrink-0"></div>
                  )}
                  <span className="text-lg font-semibold text-gray-700">{step.text}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-40 h-40 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-full mb-8 shadow-3xl animate-bounce">
              <CheckCircle className="w-20 h-20 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight">
              SPOT Complete!
              <span className="block text-6xl md:text-8xl">🎉</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-16 leading-relaxed max-w-3xl mx-auto">
              Your personalized SPOT Analysis is ready! Discover your winning hand of business strengths, opportunities, and growth strategy.
            </p>
          </div>

          <button className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-6 px-16 rounded-2xl font-bold text-2xl hover:from-orange-600 hover:via-amber-600 hover:to-orange-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl">
            View Your Results
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="container mx-auto">
        {renderProgressBar()}
        
        <div className="transition-all duration-700 ease-in-out">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>
      </div>
    </div>
  );
}

export default App;