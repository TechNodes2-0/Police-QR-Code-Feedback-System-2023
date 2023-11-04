import dotenv from "dotenv";
import twilio from "twilio";
import { FeedbackQuestions, Welcome, Greetings, StationNames, StationIDs } from "../Feedback";
// import {Feedback} from "./models/feedbackModel";
dotenv.config();

const SID = process.env.SID;
const KEY = process.env.KEY;

twilio(SID, KEY);
const { MessagingResponse } = twilio.twiml;
const User = {
  Phone_No: null,
  Station_ID: null,
  lan: null,
  Feedback: [],
};
let Ques = 0;
let stationflag = false;
let lanflag = false;
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
    const q = req.body.Body.trim();
    if(q == -1){
      Ques = 0;
      lanflag = false;
      stationflag = false;
      User.lan = null;
      User.Feedback = [];
    }else if(q == -2){
      console.log("Ques : " + Ques);
      console.log("lanflag : " + lanflag);
      console.log("stationflag : " + stationflag);
      console.log("User : " + User);
    }

    try {

      const messages = [];
      async function sendMessagesInOrder(messages, delay) {
        for (let index in messages) {
          twiml.message(messages[index]);
          await new Promise((resolve) => setTimeout(resolve, delay)); // Introduce a delay
        }
      }

      if (Ques == 0 && !stationflag) {
        console.log("Station Selection ");
        const select_station =
          "Please select your Police Station by typing the corresponding number: ";
        const options =
          StationNames.join("\n");  
        messages.push(Welcome.gu, select_station, options);
        await sendMessagesInOrder(messages, 100);
        stationflag = true;
      }  // } else if (isNaN(q)) {
      //   twiml.message(
      //     "Sorry, but we can only process numerical values. *Please enter a valid number.*"
      //   );
      //   // await sendMessagesInOrder(messages, 100);
      // }
      else if (Ques == 0 && !lanflag) {
        console.log("Language Selection ");
        User.Station_ID = StationIDs[q - 1];
        lanflag = true;
        twiml.message(
          "Please select your preferred language by typing the corresponding number: \n1.ગુજરાતી \n2.हिंदी \n3.English"
        );
        res.set("Content-Type", "text/xml");
        return res.status(200).send(twiml.toString());
      } 
      else if (Ques == 0 && stationflag && lanflag) {
        console.log("Feedback Start ");
        User.lan = language[q - 1];
        const options =
          FeedbackQuestions[`${User.lan}`][Ques].options.join("\n"); // Join the options as a string one After Onther in Next Line

        messages.push(
          Welcome[`${User.lan}`],
          FeedbackQuestions[`${User.lan}`][Ques++].question,
        )
        messages.push(options);
        await sendMessagesInOrder(messages, 100);
      } 
      else if (Ques < FeedbackQuestions[`${User.lan}`].length) {
        // console.log("Sending Ques: "+ Ques);
        const feed = {
          question: FeedbackQuestions[`${User.lan}`][Ques - 1].question,
          answer: FeedbackQuestions[`${User.lan}`][Ques - 1].options[q-1],
        };
        // console.log("Sending Ques: " + Ques);
        User.Feedback.push(feed);
        // twiml.message(FeedbackQuestions[Ques].question);
        const options =
          FeedbackQuestions[`${User.lan}`][Ques].options.join("\n"); // Join the options as a string one After Onther in Next Line
        // twiml.message(`${options}`);
        messages.push(
          FeedbackQuestions[`${User.lan}`][Ques++].question,
          options
        );
        await sendMessagesInOrder(messages, 100);
      } else {
        if (Ques == FeedbackQuestions[`${User.lan}`].length) {
          const feed = {
            question: FeedbackQuestions[`${User.lan}`][Ques - 1].question,
            answer: FeedbackQuestions[`${User.lan}`][Ques - 1].options[q-1],
          };
          User.Feedback.push(feed);
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
