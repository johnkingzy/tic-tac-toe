import Head from 'next/head';
import Board from 'components/Board';

export default function Home() {
  return (
    <>
      <Head>
        <title>TicTacToe App</title>
        <meta name="description" content="Tic! Tac! Toe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mt-2 mt-md-5">
        <div className="row">
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <h3 className="display-2 text-white text-center my-5">
             <span className='text-warning'>
             Tic!
             </span>
             <span className='text-info'>
             Tac!
             </span>
              <span className='text-white'>
              Toe!
              </span>
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
