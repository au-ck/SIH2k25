import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechRecognition: typeof SpeechRecognition;
  }
}

const VoiceAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTranscript, setShowTranscript] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = (event) => {
      const current = event.resultIndex;
      const result = event.results[current][0];
      const transcriptText = result.transcript;
      setTranscript(transcriptText);

      if (event.results[current].isFinal) {
        handleVoiceCommand(transcriptText.toLowerCase());
      }
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      // Delay hiding transcript only if component still mounted
      setTimeout(() => {
        setShowTranscript(false);
      }, 3000);
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setShowTranscript(false);
      // Optional: Add user feedback here for errors
    };

    recognitionRef.current = recognitionInstance;

    return () => {
      recognitionInstance.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setShowTranscript(true);
        setTranscript('Listening...');
      } catch (error) {
        console.error('Failed to start recognition:', error);
      }
    } else {
      alert('Speech Recognition API not supported in this browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

 const handleVoiceCommand = (command: string) => {
  console.log('Voice command:', command);

  if (command.includes('track') && command.includes('bus')) {
    speak('Opening bus tracking');
    navigate('/track-bus');
  } else if (command.includes('find') && command.includes('bus')) {
    speak('Opening bus search');
    navigate('/find-bus');
  } else if (command.includes('book') && command.includes('bus')) {
    speak('Opening bus booking');
    navigate('/book-bus');
  } else if (command.includes('my') && (command.includes('booking') || command.includes('ticket'))) {
    speak('Opening your bookings');
    navigate('/my-bookings');
  } else if (command.includes('dashboard') || command.includes('home')) {
    speak('Going to dashboard');
    navigate('/');
  } else if (command.includes('profile') || command.includes('account')) {
    speak('Opening your profile');
    navigate('/profile');
  } else if (command.includes('demo')) {
    speak('Opening demo page');
    navigate('/demo');
  } else {
    speak('Sorry, I didn\'t understand that command. Try saying "book bus", "track bus", or "my bookings"');
  }
};

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <>
      {/* Floating Voice Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-[#90A955] hover:bg-[#4F772D]'
        } transition-colors`}
        aria-label={isListening ? 'Stop Listening' : 'Start Listening'}
        aria-pressed={isListening}
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <MicOff className="w-8 h-8 text-white" />
          </motion.div>
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </motion.button>

      {/* Voice Recognition Indicator */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl p-4 z-40 max-w-xs"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-3 h-3 bg-red-500 rounded-full"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#132A13]">Listening...</p>
              <div className="flex space-x-1 mt-1">
                <div className="w-1 h-1 bg-[#90A955] rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-[#90A955] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-1 bg-[#90A955] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-[#90A955] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
            <Volume2 className="w-5 h-5 text-[#4F772D]" />
          </div>
        </motion.div>
      )}

      {/* Transcript Display */}
      {showTranscript && transcript && transcript !== 'Listening...' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-24 right-6 bg-[#132A13] text-white rounded-2xl shadow-2xl p-4 z-40 max-w-xs"
        >
          <p className="text-sm">"{transcript}"</p>
        </motion.div>
      )}

      {/* Voice Commands Help */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed bottom-6 left-6 bg-white rounded-2xl shadow-lg p-4 z-40 max-w-sm"
        >
          <h4 className="font-bold text-[#132A13] mb-2">Voice Commands</h4>
          <div className="space-y-1 text-sm text-[#31572C]">
            <p>• "Book bus" - Book a new ticket</p>
            <p>• "Track bus" - Open bus tracking</p>
            <p>• "Find bus" - Search for buses</p>
            <p>• "My bookings" - View your tickets</p>
            <p>• "Open profile" - View your profile</p>
            <p>• "Dashboard" - Return to dashboard</p>
            <p>• "Demo" - Open demo page</p>

          </div>
        </motion.div>
      )}
    </>
  );
};

export default VoiceAssistant;
