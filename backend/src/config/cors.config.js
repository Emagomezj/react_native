import cors from "cors";

export const config = (server) => {
    server.use(cors({
        origin: '*',
        methods: "GET,PUT,POST,DELETE",
    }));
};