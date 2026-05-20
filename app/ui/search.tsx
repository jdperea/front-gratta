import Form from 'next/form'
 
export default function Page() {
  return (
    <Form action="/search" className="flex items-center justify-center">
      {/* On submission, the input value will be appended to the URL, e.g. /search?query=abc */}
      <input name="query" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-2 -outline-offset-1 outline-white/20 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
      <button type="submit" className='ml-3'>Submit</button>
    </Form>
  )
}
