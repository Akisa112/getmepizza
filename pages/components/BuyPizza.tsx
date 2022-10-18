export default function BuyPizza(user) {
  return (
    <div className='mt-1 py-8 m-4  border-2 border-gray-200 rounded-lg '>
      <h4 className='font-CircularMedium text-2xl'>
        Buy <span className='text-gray-500'>{user.displayName}</span> a pizza
      </h4>
      <div className='mt-10 py-6 m-4  border-2 border-gray-200 rounded-lg bg-orange-50'>
        <p className='font-Montserrat text-gray-500'>
          <span className='text-5xl align-middle'>🍕</span> x
          <span className='ml-4 px-4 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            1
          </span>
          <span className='px-4 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            2
          </span>
          <span className='px-4 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            5
          </span>
          <span className='px-3 text-orange-600 py-2 mx-1 border-2 rounded-full'>
            10
          </span>
        </p>
      </div>

      <form>
        <div className='mt-1 mx-4 border-2 border-gray-200 rounded-lg bg-gray-100 '>
          <textarea
            className='min-w-full p-3 bg-gray-100'
            placeholder='Say something nice... (optional)'
          />
        </div>
        <button
          type='submit'
          className='font-CircularMedium bg-yellow-400 rounded-full mt-6 py-3 w-72 text-center md:max-w-xs md:mx-auto'
        >
          Support $5
        </button>
      </form>
    </div>
  );
}
