// First, let's set up our Mux client so we can easily talk to the Mux API
import Mux from '@mux/mux-node';

// If your MUX_TOKEN_ID and MUX_TOKEN_SECRET are in your .env
// Mux() will pick them up
const { Video } = new Mux();

export default Video;
