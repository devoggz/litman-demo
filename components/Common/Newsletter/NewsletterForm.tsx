export default function NewsletterForm() {
  return (
    <form>
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          className="w-full px-5 py-3 border rounded-lg bg-gray-1 border-gray-3 outline-hidden placeholder:text-dark-4"
          id="email"
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <button
          className="inline-flex items-center justify-center py-3 font-medium text-white duration-200 ease-out rounded-lg px-7 bg-green-bright/80 hover:bg-dark-6"
          type="submit"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
