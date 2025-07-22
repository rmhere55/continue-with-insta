// import React from 'react';

// const App = () => {
//   const handleInstagramLogin = () => {
//     window.location.href = `https://api.instagram.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=http://localhost:5173/&scope=user_profile,user_media&response_type=code`;
//   };

//   return (
//     <div>
//       <button onClick={handleInstagramLogin}>
//         Continue with Instagram
//       </button>
//     </div>
//   );
// };

// export default App;
// App.jsx
import React, { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const INSTAGRAM_CLIENT_ID = 'YOUR_APP_ID';
  const REDIRECT_URI = 'http://localhost:5173/';

  const handleInstagramLogin = () => {
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile&response_type=code`;
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      axios
        .post("http://localhost:5000/api/insta-token", { code })
        .then((res) => {
          console.log("✅ Access Token:", res.data.access_token);
          console.log("👤 User ID:", res.data.user_id);
        })
        .catch((err) => console.error("❌ Error:", err));
    }
  }, []);

  return (
    <div>
      <button onClick={handleInstagramLogin}>Continue with Instagram</button>
    </div>
  );
};

export default App;
