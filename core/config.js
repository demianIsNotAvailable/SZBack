const config = {
    SECRET: process.env.SECRET,
    HASH_ROUNDS: Number (process.env.HASH_ROUNDS),
    PORT: process.env.PORT,
    DB_LOCAL: process.env.LOCAL_URL,
    DB_URL: process.env.DB_URL
}

export default config