import React, { useState } from 'react';
import SVG from './svg/SVG';
import type { EmailProps, EmailFormData } from '../types/Email';
import { EmailService } from '../lib/email-service';
import { EMAIL_CONFIG } from '../lib/email-config';

const Email: React.FC<EmailProps> = ({ isOpen = true, onToggle, recipientEmail = EMAIL_CONFIG.DEFAULT_RECIPIENT }) => {
    const [formData, setFormData] = useState<EmailFormData>({
        user_email: '',
        message: EMAIL_CONFIG.DEFAULT_MESSAGE
    });
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendEmail = async () => {
        if (!formData.user_email.trim()) {
            return;
        }

        setIsLoading(true);
        try {
            await EmailService.sendEmail(formData);
            setEmailSent(true);
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendAnother = () => {
        setEmailSent(false);
        setFormData({
            user_email: '',
            message: EMAIL_CONFIG.DEFAULT_MESSAGE
        });
    };

    if (!isOpen) return null;
    
    return (
        <div className="w-full h-screen">
            <div className="w-full h-full flex items-center justify-center">
                <div className="rounded-lg shadow-2xl w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-3 rounded-t-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <SVG iconName="email" />
                            <h3 className="font-semibold text-sm">Send an email (To: {recipientEmail})</h3>
                        </div>
                        <button
                            onClick={() => onToggle?.(false)}
                            className="text-white hover:text-blue-200 transition-colors"
                        >
                            <SVG iconName="close" />
                        </button>
                    </div>

                    {/* Content Area */}
                    {emailSent ? (
                        
                        /* Success Screen */
                        <div className="flex-1 flex flex-col">
                            <div className="flex-1 flex flex-col bg-gray-20 items-center justify-center p-8">
                                {/* Success Icon */}
                                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                
                                {/* Success Message */}
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Email Sent!</h2>
                                <p className="text-purple-10 text-center text-lg font-medium mb-8">
                                    We are looking forward to talking to you!
                                </p>
                                
                            </div>
                            {/* Send Another Email Button */}
                            <div className="p-4 bg-white border-t">
                                <button
                                    onClick={handleSendAnother}
                                    className="w-fit bg-purple text-white text-sm py-2 px-12 rounded-full font-medium hover:bg-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    Send Another Email
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Email Form */
                        <>
                            <div className="flex-1 flex flex-col bg-gray-20">
                                {/* Add your Email ID Section */}
                                <div className="p-4 border-b">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Add your Email ID</h4>
                                    <input
                                        type="email"
                                        name="user_email"
                                        placeholder="Type your email here"
                                        value={formData.user_email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm bg-gray-20"
                                    />
                                </div>

                                {/* Email Message Content */}
                                <div className="flex-1 p-4">
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full h-full resize-none border-none focus:outline-none text-sm leading-relaxed bg-gray-20"
                                        placeholder="Type your message here..."
                                    />
                                </div>
                            </div>

                            {/* Send Button */}
                            <div className="p-4 bg-white border-t">
                                <button
                                    onClick={handleSendEmail}
                                    disabled={isLoading || !formData.user_email.trim()}
                                    className="w-fit bg-purple text-white text-sm py-2 px-12 rounded-full font-medium hover:bg-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                    <span>{isLoading ? 'Sending...' : 'Send Email'}</span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Email;