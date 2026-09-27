import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Envelope from './components/Envelope.jsx';
import Invitation from './components/Invitation.jsx';
import GiftList from './components/GiftList.jsx';

export default function App() {
  const [opened, setOpened] = useState(false);
  const path = window.location.pathname.replace(/\/$/, '');
  const isPastorInvitation = path === '/convite_pastor';
  const isGiftList = path === '/lista-presentes';

  if (isGiftList) {
    return <GiftList />;
  }

  return (
    <AnimatePresence mode="wait">
      {!opened ? (
        <Envelope key="envelope" onOpen={() => setOpened(true)} />
      ) : (
        <Invitation key="invitation" pastorMode={isPastorInvitation} />
      )}
    </AnimatePresence>
  );
}
