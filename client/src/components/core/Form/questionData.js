const questions = {
    en: [
      {
        question:
          "How would you rate your overall satisfaction with the police services in your community?",
        key: "satisfaction",
        options: [
          { value: "Yes", label: "Yes" },
          { value: "satisfied", label: "Satisfied" },
          { value: "neutral", label: "Neutral" },
          { value: "dissatisfied", label: "Dissatisfied" },
          { value: "veryDissatisfied", label: "Very Dissatisfied" },
        ],
      },
      {
        question:
          "How would you rate the responsiveness of the police in addressing community concerns?",
        key: "responsiveness",
        options: [
          { value: "verySatisfied", label: "Very Satisfied" },
          { value: "satisfied", label: "Satisfied" },
          { value: "neutral", label: "Neutral" },
          { value: "dissatisfied", label: "Dissatisfied" },
          { value: "veryDissatisfied", label: "Very Dissatisfied" },
        ],
      },
      {
        question:
          "Do you think the police effectively communicate with the community and keep residents informed about safety issues and initiatives?",
        key: "communication",
        options: [
          { value: "verySatisfied", label: "Very Satisfied" },
          { value: "satisfied", label: "Satisfied" },
          { value: "neutral", label: "Neutral" },
          { value: "dissatisfied", label: "Dissatisfied" },
          { value: "veryDissatisfied", label: "Very Dissatisfied" },
        ],
      },
      {
        question:
          "How would you rate the level of trust you have in the police in your community?",
        key: "trust",
        options: [
          { value: "verySatisfied", label: "Very Satisfied" },
          { value: "satisfied", label: "Satisfied" },
          { value: "neutral", label: "Neutral" },
          { value: "dissatisfied", label: "Dissatisfied" },
          { value: "veryDissatisfied", label: "Very Dissatisfied" },
        ],
      },
      {
        question:
          "How satisfied are you with the process for reporting incidents or complaints against the police?",
        key: "reporting",
        options: [
          { value: "verySatisfied", label: "Very Satisfied" },
          { value: "satisfied", label: "Satisfied" },
          { value: "neutral", label: "Neutral" },
          { value: "dissatisfied", label: "Dissatisfied" },
          { value: "veryDissatisfied", label: "Very Dissatisfied" },
        ],
      },
    ],
    hi: [
      {
        question:
          "आपके समुदाय में पुलिस सेवाओं के साथ आपके कुल संतोष को आप किस प्रकार से मूल्यांकित करेंगे?",
        key: "satisfaction",
        options: [
          { value: "verySatisfied", label: "बहुत संतुष्ट" },
          { value: "satisfied", label: "संतुष्ट" },
          { value: "neutral", label: "न्यूट्रल" },
          { value: "dissatisfied", label: "असंतुष्ट" },
          { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
        ],
      },
      {
        question:
          "पुलिस के समुदाय के मुद्दों को संबोधन करने में पुलिस की प्रतिक्रिया को आप कैसे मूल्यांकित करेंगे?",
        key: "responsiveness",
        options: [
          { value: "verySatisfied", label: "बहुत संतुष्ट" },
          { value: "satisfied", label: "संतुष्ट" },
          { value: "neutral", label: "न्यूट्रल" },
          { value: "dissatisfied", label: "असंतुष्ट" },
          { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
        ],
      },
      {
        question:
          "क्या आपको लगता है कि पुलिस समुदाय के साथ प्रभावी रूप से संवाद करती है और निवासियों को सुरक्षा मुद्दों और पहल के बारे में सूचित करती है?",
        key: "communication",
        options: [
          { value: "verySatisfied", label: "बहुत संतुष्ट" },
          { value: "satisfied", label: "संतुष्ट" },
          { value: "neutral", label: "न्यूट्रल" },
          { value: "dissatisfied", label: "असंतुष्ट" },
          { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
        ],
      },
      {
        question: "आपके समुदाय में पुलिस पर जोर किस प्रकार की आस्था है?",
        key: "trust",
        options: [
          { value: "verySatisfied", label: "बहुत संतुष्ट" },
          { value: "satisfied", label: "संतुष्ट" },
          { value: "neutral", label: "न्यूट्रल" },
          { value: "dissatisfied", label: "असंतुष्ट" },
          { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
        ],
      },
      {
        question:
          "क्या आप पुलिस के खिलाफ घटनाओं या शिकायतों की रिपोर्ट करने की प्रक्रिया से कितने संतुष्ट हैं?",
        key: "reporting",
        options: [
          { value: "verySatisfied", label: "बहुत संतुष्ट" },
          { value: "satisfied", label: "संतुष्ट" },
          { value: "neutral", label: "न्यूट्रल" },
          { value: "dissatisfied", label: "असंतुष्ट" },
          { value: "veryDissatisfied", label: "बहुत असंतुष्ट" },
        ],
      },
      // Add more questions and options as needed
    ],
  
    gu: [
      {
        question:
          "તમારી જમીન સમુદાયમાં પોલીસ સેવાઓ સાથે તમારી મુલાકાતની કુલ સંતોષ તમે કેવી રીતે મૂલ્યાંકિત કરો છો?",
        key: "satisfaction",
        options: [
          { value: "verySatisfied", label: "ખૂબ આનંદિત" },
          { value: "satisfied", label: "આનંદિત" },
          { value: "neutral", label: "મૂળભૂત" },
          { value: "dissatisfied", label: "અસંતુષ્ટ" },
          { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
        ],
      },
      {
        question:
          "કેમ પોલીસ સમુદાયના ચિંતાઓ નો સમાધાન કરવા માં પોલીસની પ્રતિસાદકારતાનો રેટ કેમ આપો છો?",
        key: "responsiveness",
        options: [
          { value: "verySatisfied", label: "ખૂબ આનંદિત" },
          { value: "satisfied", label: "આનંદિત" },
          { value: "neutral", label: "મૂળભૂત" },
          { value: "dissatisfied", label: "અસંતુષ્ટ" },
          { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
        ],
      },
      {
        question:
          "શું તમારું લાગણીઓ અને પ્રયાસો વિશે સમુદાયને સફાઈથી મામ રાખવા અને નિવાસીઓને સુરક્ષા વિચારો અને યોજનાઓ વિશે સાચાણ પર પોલીસ દ્વારા પ્રભાવશાળી રીતે સંવાદ કરે છે?",
        key: "communication",
        options: [
          { value: "verySatisfied", label: "ખૂબ આનંદિત" },
          { value: "satisfied", label: "આનંદિત" },
          { value: "neutral", label: "મૂળભૂત" },
          { value: "dissatisfied", label: "અસંતુષ્ટ" },
          { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
        ],
      },
      {
        question:
          "તમારું સમુદાય પોલીસ પર કેટલીક આસ્થા છે, આ વિશે તમને કેમ લાગે છે?",
        key: "trust",
        options: [
          { value: "verySatisfied", label: "ખૂબ આનંદિત" },
          { value: "satisfied", label: "આનંદિત" },
          { value: "neutral", label: "મૂળભૂત" },
          { value: "dissatisfied", label: "અસંતુષ્ટ" },
          { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
        ],
      },
      {
        question:
          "પોલીસ વિરુદ્ધ ઘટનાઓ અથવા શિકાયતો ની રિપોર્ટ કરવાની પ્રક્રિયા પર તમારું કેટલું આનંદ છે?",
        key: "reporting",
        options: [
          { value: "verySatisfied", label: "ખૂબ આનંદિત" },
          { value: "satisfied", label: "આનંદિત" },
          { value: "neutral", label: "મૂળભૂત" },
          { value: "dissatisfied", label: "અસંતુષ્ટ" },
          { value: "veryDissatisfied", label: "ખૂબ અસંતુષ્ટ" },
        ],
      },
    ],
    // Add more questions and options as needed
  };