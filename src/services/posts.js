
import axios from "axios";

const posts = [
  {
    user: {
      name: "yahia",
      email: "y@g.com"
    },
    date: "25/01/2021",
    content: "Hello",
    likes: {
      count: 4
    }
  },
  {
    user: {
      name: "moha",
      email: "y@gb.com"
    },
    date: "25/01/2021",
    content: "This is a post!!",
    likes: {
      count: 0
    }
  },

];

export default posts;