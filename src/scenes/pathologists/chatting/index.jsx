// import React, { useEffect, useState } from "react";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";
// import { useUser } from "@clerk/clerk-react";
// import { Box, colors, useTheme } from "@mui/material";
// import Header from "component/Header";

// import "./index.css";
// import axios from "axios";
// import { useOrganization } from "@clerk/clerk-react";

// var stompClient = null;
// const PathologistsChatting = () => {
//   const theme = useTheme();

//   const [privateChats, setPrivateChats] = useState(new Map());
//   const [publicChats, setPublicChats] = useState([]);
//   const [tab, setTab] = useState("CHATROOM");
//   const [userData, setUserData] = useState({
//     username: "",
//     receivername: "",
//     connected: false,
//     message: "",
//   });

//   // console.log()
//   const { user } = useUser();
//   const [pathologistsList, setpathologistsList] = useState([]);
//   // const [pathologistsma, setpathologistsList] = useState([]);

//   const { membershipList, membership } = useOrganization({
//     membershipList: {},
//   });

//   useEffect(() => {
//     if (membershipList && user) {
//       var basicMembers = membershipList.filter(
//         (m) => m.role === "basic_member"
//       );
//       const identifiers = basicMembers.map((m) => m.publicUserData.identifier);
//       setpathologistsList(identifiers);

//       setPrivateChats((prevPrivateChats) => {
//         const updatedPrivateChats = new Map(prevPrivateChats);

//         identifiers.forEach((identifier) => {
//           if (
//             identifier !== user.primaryEmailAddress.emailAddress &&
//             !updatedPrivateChats.has(identifier)
//           ) {
//             updatedPrivateChats.set(identifier, []);
//           }
//         });
//         return updatedPrivateChats;
//       });
//     }
//   }, [user]);

//   console.log(pathologistsList);

//   // Filter members whose role is 'admin'

//   console.log(privateChats);
//   useEffect(() => {
//     console.log(userData);
//   }, [userData]);

//   useEffect(() => {
//     if (user.username) {
//       // Update the userData state
//       setUserData({
//         ...userData,
//         username: user.primaryEmailAddress.emailAddress,
//       });
//     }
//   }, [user]); // Add 'user' as a dependency
//   useEffect(() => {
//     // This effect runs when 'userData' changes
//     if (userData.username) {
//       const connect = () => {
//         let Sock = new SockJS("http://localhost:8081/ws");
//         stompClient = over(Sock);
//         stompClient.connect({}, onConnected, onError);
//       };
//       connect();
//     }
//   }, [userData.username]);

//   const connect = () => {
//     let Sock = new SockJS("http://localhost:8081/ws");
//     stompClient = over(Sock);
//     stompClient.connect({}, onConnected, onError);
//   };

//   const onConnected = () => {
//     setUserData({ ...userData, connected: true });
//     stompClient.subscribe("/chatroom/public", onMessageReceived);
//     stompClient.subscribe(
//       "/user/" + userData.username + "/private",
//       onPrivateMessage
//     );
//     userJoin();
//   };

//   const userJoin = () => {
//     var chatMessage = {
//       senderName: userData.username,
//       status: "JOIN",
//     };
//     stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   };

//   const onMessageReceived = (payload) => {
//     var payloadData = JSON.parse(payload.body);
//     switch (payloadData.status) {
//       case "JOIN":
//         if (!privateChats.get(payloadData.senderName)) {
//           privateChats.set(payloadData.senderName, []);
//           setPrivateChats(new Map(privateChats));
//         }
//         break;
//       case "MESSAGE":
//         publicChats.push(payloadData);
//         setPublicChats([...publicChats]);
//         break;
//       default:
//         // Add a default case to handle unexpected values
//         console.warn(`Unexpected status: ${payloadData.status}`);
//         break;
//     }
//   };

//   const onPrivateMessage = (payload) => {
//     var payloadData = JSON.parse(payload.body);

//     setPrivateChats((prevPrivateChats) => {
//       const updatedPrivateChats = new Map(prevPrivateChats);

//       if (updatedPrivateChats.has(payloadData.senderName)) {
//         const existingMessages = updatedPrivateChats.get(
//           payloadData.senderName
//         );
//         updatedPrivateChats.set(payloadData.senderName, [
//           ...existingMessages,
//           payloadData,
//         ]);
//       } else {
//         updatedPrivateChats.set(payloadData.senderName, [payloadData]);
//       }

//       return updatedPrivateChats;
//     });
//   };
//   const onError = (err) => {
//     console.log(err);
//   };

//   const handleMessage = (event) => {
//     const { value } = event.target;
//     setUserData({ ...userData, message: value });
//   };
//   const sendValue = () => {
//     if (stompClient) {
//       var chatMessage = {
//         senderName: userData.username,
//         message: userData.message,
//         status: "MESSAGE",
//       };
//       console.log(chatMessage);
//       stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, message: "" });
//     }
//   };

//   const sendPrivateValue = () => {
//     if (stompClient) {
//       var chatMessage = {
//         senderName: userData.username,
//         receiverName: tab,
//         message: userData.message,
//         status: "MESSAGE",
//       };

//       if (userData.username !== tab) {
//         privateChats.get(tab).push(chatMessage);
//         setPrivateChats(new Map(privateChats));
//       }
//       stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
//       setUserData({ ...userData, message: "" });
//     }
//   };

//   const handleUsername = (event) => {
//     const { value } = event.target;
//     setUserData({ ...userData, username: value });
//   };

//   const registerUser = () => {
//     connect();
//   };
//   return (
//     <Box m="1.5rem 2.5rem">
//       <div className="container">
//         <Header title={"Chatting"} subtitle={"Chats with pathologists"} />{" "}
//         {userData.connected ? (
//           <div className="chat-box">
//             <div className="member-list">
//               <ul>
//                 {[...privateChats.keys()].map(
//                   (name, index) =>
//                     name !== userData.username && (
//                       <li
//                         style={{
//                           backgroundColor: theme.palette.background.alt,
//                           color: theme.palette.secondary[100],
//                           marginBottom: "2px",
//                           // width: "150px",
//                         }}
//                         onClick={async () => {
//                           if (tab !== name) {
//                             try {
//                               const messageData = {
//                                 senderName: name,
//                                 receiverName:
//                                   user.primaryEmailAddress.emailAddress,
//                               };
//                               // console.log("gmil: ", user.primaryEmailAddress.emailAddress.split('@')[0],)

//                               const response = await axios.post(
//                                 "http://localhost:8081/chats/search",
//                                 messageData
//                               );

//                               // Assuming the response data is an array of messages
//                               const messages = response.data;

//                               // Update privateChats state by appending messages to the current tab
//                               setPrivateChats((prevPrivateChats) => {
//                                 const updatedPrivateChats = new Map(
//                                   prevPrivateChats
//                                 );

//                                 // Check if the current tab exists in the privateChats map
//                                 if (updatedPrivateChats.has(name)) {
//                                   // updatedPrivateChats.set(name, []);
//                                   const existingMessages =
//                                     updatedPrivateChats.get(name);
//                                   updatedPrivateChats.set(name, [
//                                     // ...existingMessages,
//                                     ...messages,
//                                   ]);
//                                 } else {
//                                   // If the current tab doesn't exist, create a new entry
//                                   updatedPrivateChats.set(name, messages);
//                                 }
//                                 return updatedPrivateChats;
//                               });

//                               setTab(name);
//                             } catch (e) {
//                               console.log(e);
//                             }
//                           }
//                         }}
//                         className={`member ${tab === name && "active"}`}
//                         key={index}
//                       >
//                         {name.split("@")[0]}
//                       </li>
//                     )
//                 )}{" "}
//               </ul>{" "}
//             </div>{" "}
//             {tab === "CHATROOM" && (
//               <div className="chat-content">
//                 <ul className="chat-messages">
//                   {" "}
//                   {publicChats.map((chat, index) => (
//                     <li
//                       style={{
//                         backgroundColor: theme.palette.background.alt,
//                         color: theme.palette.secondary[100],
//                       }}
//                       className={`message ${
//                         chat.senderName === userData.username && "self"
//                       }`}
//                       key={index}
//                     >
//                       {" "}
//                       {chat.senderName !== userData.username && (
//                         <div className="avatar"> {chat.senderName} </div>
//                       )}{" "}
//                       <div
//                         className="message-data"
//                         style={{
//                           backgroundColor: theme.palette.background.alt,
//                           color: theme.palette.secondary[100],
//                         }}
//                       >
//                         {" "}
//                         {chat.message}{" "}
//                       </div>{" "}
//                       {chat.senderName === userData.username && (
//                         <div className="avatar self"> {chat.senderName} </div>
//                       )}{" "}
//                     </li>
//                   ))}{" "}
//                 </ul>
//                 <div className="send-message">
//                   <input
//                     style={{
//                       backgroundColor: theme.palette.background.alt,
//                       color: theme.palette.secondary[100],
//                     }}
//                     type="text"
//                     className="input-message"
//                     placeholder="enter the message"
//                     value={userData.message}
//                     onChange={handleMessage}
//                   />{" "}
//                   <button
//                     style={{
//                       backgroundColor: theme.palette.background[100],
//                       color: theme.palette.secondary[100],
//                     }}
//                     type="button"
//                     className="send-button"
//                     onClick={sendValue}
//                   >
//                     {" "}
//                     send{" "}
//                   </button>{" "}
//                 </div>{" "}
//               </div>
//             )}{" "}
//             {tab !== "CHATROOM" && (
//               <div className="chat-content">
//                 <ul
//                   className="chat-messages"
//                   style={{
//                     borderRadius: "30px",
//                   }}
//                 >
//                   {" "}
//                   {[...privateChats.get(tab)].map((chat, index) => (
//                     <li
//                       style={{
//                         backgroundColor: theme.palette.background.alt,
//                         color: theme.palette.secondary[100],
//                       }}
//                       className={`message ${
//                         chat.senderName === userData.username && "self"
//                       }`}
//                       key={index}
//                     >
//                       {" "}
//                       {chat.senderName !== userData.username && (
//                         <div className="avatar"> {chat.senderName} </div>
//                       )}{" "}
//                       <div className="message-data"> {chat.message} </div>{" "}
//                       {chat.senderName === userData.username && (
//                         <div className="avatar self"> {chat.senderName} </div>
//                       )}{" "}
//                     </li>
//                   ))}{" "}
//                 </ul>
//                 <div className="send-message">
//                   <input
//                     style={{
//                       backgroundColor: theme.palette.background.alt,
//                       color: theme.palette.secondary[100],
//                     }}
//                     type="text"
//                     className="input-message"
//                     placeholder="enter the message"
//                     value={userData.message}
//                     onChange={handleMessage}
//                   />{" "}
//                   <button
//                     style={{
//                       backgroundColor: theme.palette.background.alt,
//                       color: theme.palette.secondary[100],
//                     }}
//                     type="button"
//                     className="send-button"
//                     onClick={sendPrivateValue}
//                   >
//                     {" "}
//                     send{" "}
//                   </button>{" "}
//                 </div>{" "}
//               </div>
//             )}{" "}
//           </div>
//         ) : null}{" "}
//       </div>
//     </Box>
//   );
// };

// export default PathologistsChatting;
import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useUser } from "@clerk/clerk-react";
import { Box, colors, useTheme } from "@mui/material";
import Header from "component/Header";

import "./index.css";
import axios from "axios";
import { useOrganization } from "@clerk/clerk-react";

var stompClient = null;
const PathologistsChatting = () => {
  const theme = useTheme();

  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });

  // console.log()
  const { user } = useUser();
  const [pathologistsList, setpathologistsList] = useState([]);
  // const [pathologistsma, setpathologistsList] = useState([]);

  const { membershipList, membership } = useOrganization({
    membershipList: {},
  });

  useEffect(() => {
    if (membershipList && user) {
      var basicMembers = membershipList.filter(
        (m) => m.role === "basic_member"
      );
      const identifiers = basicMembers.map((m) => m.publicUserData.identifier);
      setpathologistsList(identifiers);

      setPrivateChats((prevPrivateChats) => {
        const updatedPrivateChats = new Map(prevPrivateChats);

        identifiers.forEach((identifier) => {
          if (
            identifier !== user.primaryEmailAddress.emailAddress &&
            !updatedPrivateChats.has(identifier)
          ) {
            updatedPrivateChats.set(identifier, []);
          }
        });
        return updatedPrivateChats;
      });
    }
  }, [user]);

  console.log(pathologistsList);

  // Filter members whose role is 'admin'

  console.log(privateChats);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (user.username) {
      // Update the userData state
      setUserData({
        ...userData,
        username: user.primaryEmailAddress.emailAddress,
      });
    }
  }, [user]); // Add 'user' as a dependency
  useEffect(() => {
    // This effect runs when 'userData' changes
    if (userData.username) {
      const connect = () => {
        let Sock = new SockJS("http://localhost:8081/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
      };
      connect();
    }
  }, [userData.username]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8081/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      default:
        // Add a default case to handle unexpected values
        console.warn(`Unexpected status: ${payloadData.status}`);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);

    setPrivateChats((prevPrivateChats) => {
      const updatedPrivateChats = new Map(prevPrivateChats);

      if (updatedPrivateChats.has(payloadData.senderName)) {
        const existingMessages = updatedPrivateChats.get(
          payloadData.senderName
        );
        updatedPrivateChats.set(payloadData.senderName, [
          ...existingMessages,
          payloadData,
        ]);
      } else {
        updatedPrivateChats.set(payloadData.senderName, [payloadData]);
      }

      return updatedPrivateChats;
    });
  };
  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };
  return (
    // <Box m="1.5rem 2.5rem">
    <div className="container">
      {/* <Header title={"Chatting"} subtitle={"Chats with pathologists"} />{" "} */}
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              {[...privateChats.keys()].map(
                (name, index) =>
                  name !== userData.username && (
                    <li
                      style={{
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        marginBottom: "2px",
                        width: "150px",
                      }}
                      onClick={async () => {
                        if (tab !== name) {
                          try {
                            const messageData = {
                              senderName: name,
                              receiverName:
                                user.primaryEmailAddress.emailAddress,
                            };
                            // console.log("gmil: ", user.primaryEmailAddress.emailAddress.split('@')[0],)

                            const response = await axios.post(
                              "http://localhost:8081/chats/search",
                              messageData
                            );

                            // Assuming the response data is an array of messages
                            const messages = response.data;

                            // Update privateChats state by appending messages to the current tab
                            setPrivateChats((prevPrivateChats) => {
                              const updatedPrivateChats = new Map(
                                prevPrivateChats
                              );

                              // Check if the current tab exists in the privateChats map
                              if (updatedPrivateChats.has(name)) {
                                // updatedPrivateChats.set(name, []);
                                const existingMessages =
                                  updatedPrivateChats.get(name);
                                updatedPrivateChats.set(name, [
                                  // ...existingMessages,
                                  ...messages,
                                ]);
                              } else {
                                // If the current tab doesn't exist, create a new entry
                                updatedPrivateChats.set(name, messages);
                              }
                              return updatedPrivateChats;
                            });

                            setTab(name);
                          } catch (e) {
                            console.log(e);
                          }
                        }
                      }}
                      className={`member ${tab === name && "active"}`}
                      key={index}
                    >
                      {name.split("@")[0]}
                    </li>
                  )
              )}{" "}
            </ul>{" "}
          </div>{" "}
          {tab === "CHATROOM" && (
            <div className="chat-content">
              <ul className="chat-messages">
                {" "}
                {publicChats.map((chat, index) => (
                  <li
                    style={{
                      backgroundColor: theme.palette.background.alt,
                      color: theme.palette.secondary[100],
                    }}
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {" "}
                    {chat.senderName !== userData.username && (
                      <div className="avatar"> {chat.senderName} </div>
                    )}{" "}
                    <div
                      className="message-data"
                      style={{
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                      }}
                    >
                      {" "}
                      {chat.message}{" "}
                    </div>{" "}
                    {chat.senderName === userData.username && (
                      <div className="avatar self"> {chat.senderName} </div>
                    )}{" "}
                  </li>
                ))}{" "}
              </ul>
              <div className="send-message">
                <input
                  style={{
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                  }}
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />{" "}
                <button
                  style={{
                    backgroundColor: theme.palette.background[100],
                    color: theme.palette.secondary[100],
                  }}
                  type="button"
                  className="send-button"
                  onClick={sendValue}
                >
                  {" "}
                  send{" "}
                </button>{" "}
              </div>{" "}
            </div>
          )}{" "}
          {tab !== "CHATROOM" && (
            <div className="chat-content">
              <ul
                className="chat-messages"
                style={{
                  borderRadius: "30px",
                }}
              >
                {" "}
                {[...privateChats.get(tab)].map((chat, index) => (
                  <li
                    style={{
                      backgroundColor: theme.palette.background.alt,
                      color: theme.palette.secondary[100],
                    }}
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {" "}
                    {chat.senderName !== userData.username && (
                      <div className="avatar"> {chat.senderName} </div>
                    )}{" "}
                    <div className="message-data"> {chat.message} </div>{" "}
                    {chat.senderName === userData.username && (
                      <div className="avatar self"> {chat.senderName} </div>
                    )}{" "}
                  </li>
                ))}{" "}
              </ul>
              <div className="send-message">
                <input
                  style={{
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                  }}
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />{" "}
                <button
                  style={{
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                  }}
                  type="button"
                  className="send-button"
                  onClick={sendPrivateValue}
                >
                  {" "}
                  send{" "}
                </button>{" "}
              </div>{" "}
            </div>
          )}{" "}
        </div>
      ) : null}{" "}
    </div>
    // </Box>
  );
};

export default PathologistsChatting;
