export default function PageLoader() {
  return (
    <main className='h-[calc(100vh-163px)] flex flex-col  '>
      <div className='text-center'>
        <div className='loading animate-pulse' aria-label='Loading'>
          <div className=''></div>
          <div className='pizza' aria-hidden='true'>
            <div className='pizza_piece'>
              <div className='pizza_crust pizza_inner'></div>
              <div className='pizza_sause pizza_inner'></div>
              <div className='pizza_cheeze pizza_inner'></div>
              <div className='pizza_filling'></div>
            </div>
            <div className='pizza_piece'>
              <div className='pizza_crust pizza_inner'></div>
              <div className='pizza_sause pizza_inner'></div>
              <div className='pizza_cheeze pizza_inner'></div>
              <div className='pizza_filling'></div>
            </div>
            <div className='pizza_piece'>
              <div className='pizza_crust pizza_inner'></div>
              <div className='pizza_sause pizza_inner'></div>
              <div className='pizza_cheeze pizza_inner'></div>
              <div className='pizza_filling'></div>
            </div>
            <div className='pizza_piece'>
              <div className='pizza_crust pizza_inner'></div>
              <div className='pizza_sause pizza_inner'></div>
              <div className='pizza_cheeze pizza_inner'></div>
              <div className='pizza_filling'></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
