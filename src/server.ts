import express, { json, Request, Response } from 'express';
import cors from 'cors';
import errorHandler from 'middleware-http-errors';
import morgan from 'morgan';

// Set up web app
const app = express();
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware that allows for access from other domains
app.use(cors());
// for logging errors (print to terminal)
app.use(morgan('dev'));

const PORT: number = 3122;
const HOST: string = process.env.IP || 'localhost';

// start server
const server = app.listen(PORT, HOST, () => {
  // DO NOT CHANGE THIS LINE
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

// Example get request
app.get('/', (req: Request, res: Response) => {
  res.send('Hi!');
})

// Keep this BENEATH route definitions
// handles errors nicely
app.use(errorHandler());

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
