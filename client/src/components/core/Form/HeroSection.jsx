import React from 'react';

function HeroSection() {
  return (
    <div className="bg-blue-100 text-black flex flex-col items-center justify-center h-screen">
      <img
        src="https://blogger.googleusercontent.com/img/a/AVvXsEgW_JkmdUfxlLBXuoLZBwRBmfo-CCmMmrcC3t_tyGrRmMalXHKjCI38cCfJZ7nV4f5panqPFpnRY2hIpfhsZKOlV6Yz_91lghVxwQJavgvR3ILawMOQHR0be9-TToG80SkN4kEYe9uCQssQf1-t5HTLoivphtc2OUuU2miuOTw06S9FGmkSSlvuLj2F=w311-h400"
        alt="Welcome to Anubhuti"
        className="w-full max-w-xl md:w-1/2 lg:w-1/3"
      />
      <p className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-4">
        Welcome to Anubhuti
      </p>
      <p className="text-xl md:text-2xl lg:text-3xl font-bold mt-2">
        Gujarat Police Feedback Management System
      </p>
    </div>
  );
}

export default HeroSection;
