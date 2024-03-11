import { PeerServer } from "peer";
export default defineEventHandler((event) => {
  console.log("New request: " + getRequestURL(event));
  /* const peerServer = PeerServer({
    port: 9000,
    path: "/",
    allow_discovery: true,
    host: "0.0.0.0",
  }); */
});
