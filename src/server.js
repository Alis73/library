import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));







app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = 'Internal Server Error';
    }
    res.status(err.status).json({ error : err.message});
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;



