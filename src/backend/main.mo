import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";

actor {
  type Message = {
    name : Text;
    email : Text;
    subject : Text;
    text : Text;
    timestamp : Time.Time;
  };

  let messages = List.empty<Message>();

  public shared ({ caller }) func submitForm(name : Text, email : Text, subject : Text, text : Text) : async () {
    let message : Message = {
      name;
      email;
      subject;
      text;
      timestamp = Time.now();
    };
    messages.add(message);
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.toArray();
  };
};
