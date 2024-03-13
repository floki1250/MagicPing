import Peer from "peerjs";
import {
  uniqueNamesGenerator,
  starWars,
  adjectives,
} from "unique-names-generator";

export default defineNuxtPlugin((nuxtApp) => {
  const peerid = uniqueNamesGenerator({
    dictionaries: [adjectives, starWars],
  }).replace(/\s/g, "");
  const peer = new Peer(peerid, {});
  console.log(peer, peerid);
  nuxtApp.provide("peer", peer);
  nuxtApp.provide("peerid", peerid);
});
