declare module 'react-speech-kit' {
  export interface SpeechSynthesisProps {
    text: string;
  }

  export interface UseSpeechSynthesisResult {
    speak: (props: SpeechSynthesisProps) => void;
    cancel: () => void;
    speaking: boolean;
  }

  export interface UseSpeechRecognitionResult {
    listen: (props?: { continuous?: boolean }) => void;
    stop: () => void;
    transcript: string;
  }

  export function useSpeechSynthesis(): UseSpeechSynthesisResult;
  
  export function useSpeechRecognition(props: {
    onResult: (result: string) => void;
  }): UseSpeechRecognitionResult;
}
