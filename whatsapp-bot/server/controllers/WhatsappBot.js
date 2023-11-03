import dotenv from "dotenv";
import twilio from "twilio";
import { FeedbackQuestions, Welcome, Greetings } from "../Feedback";
dotenv.config();

const SID = process.env.SID;
const KEY = process.env.KEY;

twilio(SID, KEY);
const { MessagingResponse } = twilio.twiml;
const User = {
  Phone_No: null,
  lan: null,
  Feedback: [],
};
let Ques = 0;
let flag = false;
const language = ["gu", "hi", "en"];
/**
 * @class WhatsappBot
 * @description class will implement bot functionality
 */

class WhatsappBot {
  /**
   * @memberof WhatsappBot
   * @param {object} req - Request sent to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @returns {object} - object representing response message
   */
  static async feedback(req, res, next) {
    User.Phone_No = req.body.From.slice(-10);
    const twiml = new MessagingResponse();
    const q = parseInt(req.body.Body.trim());
    if(q == -1){
      Ques = 0;
      flag = false;
      User.lan = null;
      User.Feedback = [];
    }

    try {
      const messages = [];
      async function sendMessagesInOrder(messages, delay) {
        for (let index in messages) {
          twiml.message(messages[index]);
          await new Promise((resolve) => setTimeout(resolve, delay)); // Introduce a delay
        }
      }

      
      if (Ques == 0 && !flag) {
        const select_lan =
          "Please select your preferred language by typing the corresponding number: \n1.ગુજરાતી \n2.हिंदी \n3.English";
        messages.push(Welcome.gu, select_lan);
        await sendMessagesInOrder(messages, 500);
        flag = true;
      } else if (isNaN(q)) {
        twiml.message(
          "Sorry, but we can only process numerical values. *Please enter a valid number.*"
        );
        // await sendMessagesInOrder(messages, 500);
      } else if (Ques == 0 && flag) {
        User.lan = language[q - 1];
        const options =
          FeedbackQuestions[`${User.lan}`][Ques].options.join("\n"); // Join the options as a string one After Onther in Next Line

        messages.push(
          Welcome[`${User.lan}`],
          FeedbackQuestions[`${User.lan}`][Ques++].question,
          options
        );
        await sendMessagesInOrder(messages, 500);
      } else if (Ques < FeedbackQuestions[`${User.lan}`].length) {
        User.Feedback[Ques - 1] = q;
        // twiml.message(FeedbackQuestions[Ques].question);
        const options =
          FeedbackQuestions[`${User.lan}`][Ques].options.join("\n"); // Join the options as a string one After Onther in Next Line
        // twiml.message(`${options}`);
        messages.push(
          FeedbackQuestions[`${User.lan}`][Ques++].question,
          options
        );
        await sendMessagesInOrder(messages, 500);
      } else {
        if (Ques == FeedbackQuestions[`${User.lan}`].length) {
          User.Feedback[FeedbackQuestions[`${User.lan}`].length - 1] = q;
          twiml.message(Greetings[`${User.lan}`]);
          console.log(User);
        }
      }

      res.set("Content-Type", "text/xml");
      return res.status(200).send(twiml.toString());
    } catch (error) {
      return next(error);
    }
  }
}

export default WhatsappBot;
