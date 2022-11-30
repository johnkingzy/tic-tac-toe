import Head from 'next/head';
import Board from 'components/Board';

export default function Home() {
  return (
    <>
      <Head>
        <title>TicTacToe App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mt-2 mt-md-4">
        <div className="row">
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <h3 className="display-3 text-white text-center my-5">
              Tic! Tac! Toe!
            </h3>
          </div>
          <div className="col-md-7">
            <Board />
          </div>
        </div>
      </main>
    </>
  );
}
