import cors from "cors";

export const config = (server) => {
    server.use(cors({
        origin: '*',
        methods: "GET,PUT,POST,DELETE",
        allowedHeaders:"Origin, X-Requested-With, Content-Type, Accept, Authorization"
    }));
};