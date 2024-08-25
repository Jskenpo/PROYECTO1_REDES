
# XMPP Client Project

This project is an XMPP client built from scratch using React, Material UI, Bootstrap, Material Design, xmpp.js, and Webpack. It offers a user-friendly interface with various features for managing contacts, sending messages, and interacting with an XMPP server.

## Features

- **View Contacts and Availability:** Displays your contacts with their availability status and custom status messages.
- **Send Messages:** Allows you to send messages to your contacts directly.
- **Send Files:** Easily send files to your contacts with a secure transfer.
- **Add New Contacts:** Add new contacts to your list with ease.
- **Accept Subscription Requests:** Manage and accept subscription requests from users not in your contact list.
- **Change Availability and Custom Status:** Update your availability and set a custom status message.
- **Register a New Account:** Create a new XMPP account directly from the client.
- **Login:** Securely log in to your XMPP account.
- **Delete Account:** Permanently delete your XMPP account.
- **Push Notifications:** Receive real-time push notifications for incoming messages.
- **Contact Filtering:** Filter your contact list by username.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Jskenpo/PROYECTO1_REDES.git
   cd chat
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```


## Dependencies

The project uses the following main dependencies:

```json
"dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.3",
    "react-bootstrap": "^2.10.2",
    "bootstrap": "^5.3.3",
    "@mui/material": "^5.15.15",
    "@mui/icons-material": "^5.15.15",
    "mdb-react-ui-kit": "^8.0.0",
    "@xmpp/client": "^0.13.1",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.2"
  }
```


## Technologies Used

- **React:** For building the user interface.
- **Material UI:** For stylish and responsive UI components.
- **Bootstrap:** For layout and styling.
- **Material Design:** For consistent design principles.
- **xmpp.js:** For interacting with the XMPP server.
- **Webpack:** For bundling and building the application.

## Application Structure

The application consists of three main views:

1. **Login:** The view where users can log in to their XMPP account.
2. **Register:** The view for registering a new XMPP account.
3. **Chat:** The main view where users can interact with their contacts, send messages, and manage their account.

The project includes a total of 19 components, providing a modular and organized structure for the application.

## XmppContext Usage

The `XmppContext` is used to manage the state and actions related to the XMPP client. It provides a centralized way to handle:

- **Subscription Requests:** Manage incoming subscription requests.
- **Contacts:** Store and update the list of contacts with their availability and custom statuses.
- **Messages:** Store and manage incoming and outgoing messages, including file transfers.
- **Alerts:** Manage push notifications for incoming messages.
- **Sending Messages and Files:** Functions to send text messages and file messages to contacts.

To use `XmppContext`, wrap the application or the required components with `XmppProvider`. This will allow any component within the tree to access the context using `useXmppContext()`.

```javascript
import { XmppProvider, useXmppContext } from './path-to-context/XmppContext';

function App() {
  return (
    <XmppProvider xmppClient={yourXmppClientInstance}>
      <YourComponent />
    </XmppProvider>
  );
}

function YourComponent() {
  const { sendMessage, contacts } = useXmppContext();

  // Use sendMessage, contacts, and other context values here
}
```

## Usage

After installing the dependencies and running the application, you'll be able to:

- View your contact list, their availability and their custom status.
- Send and receive messages and files.
- Manage contact requests and update your status.
- Register, log in, and delete accounts as needed.
- Receive notifications for new messages.

## Contributors
- **José Pablo Santisteban Vargas - 21153**
