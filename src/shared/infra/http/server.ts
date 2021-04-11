import dotenv from "dotenv"
import server from './app';

dotenv.config();

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
	console.log(`🚀 Backend start on port ${PORT}`);
});
