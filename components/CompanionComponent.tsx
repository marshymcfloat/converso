"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import soundwaves from "@/constants/soundwaves.json";

// Define a basic interface for the component props
interface CompanionComponentProps {
  companionId: string;
  subject: string;
  topic: string;
  name: string;
  userName: string;
  userImage: string;
  style: string;
  voice: string;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const toggleMicrophone = () => {
    const currentMutedState = vapi.isMuted();
    vapi.setMuted(!currentMutedState);
    setIsMuted(!currentMutedState);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    // ✅ FIX: Removed the message properties from overrides. They were conflicting
    // with the main assistant config and are not needed for standard event handling.
    const assistantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
    };

    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  // ✅ FIX: Corrected useEffect for Lottie animation
  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current.play(); // Call the function with ()
      } else {
        lottieRef.current.stop(); // Call the function with ()
      }
    }
  }, [isSpeaking]); // Dependency array now correctly listens for changes to isSpeaking

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: any) => {
      // You can handle custom messages here if you add them back later
      // console.log(message);
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => {
      console.error("Vapi Error:", error);
      setCallStatus(CallStatus.FINISHED); // Reset status on error
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ background: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                loop={true}
                autoPlay={false} // Important: AutoPlay should be false so we can control it
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE} // Good practice to disable when not in a call
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              width={36}
              height={36}
              alt="mic"
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on microphone" : "Turn off microphone"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === CallStatus.ACTIVE
                ? "bg-red-700 hover:bg-red-800"
                : "bg-primary hover:bg-blue-600",
              callStatus === CallStatus.CONNECTING &&
                "animate-pulse cursor-not-allowed"
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
            disabled={callStatus === CallStatus.CONNECTING}
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
              ? "Connecting..."
              : "Start Session"}
          </button>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-message no-scrollbar">Messages</div>
        <div className="transcript-fade"></div>
      </section>
    </section>
  );
};

export default CompanionComponent;
