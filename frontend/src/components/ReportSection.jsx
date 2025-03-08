function ReportSection() {
    return (
        <section className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-3">
                Share Your Feedback
            </h2>
            <p className="text-gray-600 text-center mb-4">
                Did you enjoy your experience? Encountered any bugs? Let me know!
            </p>

            <form id="report-form" className="flex flex-col gap-4">
                <textarea
                    name="comment-area"
                    className="w-full h-32 p-3 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    placeholder="Write your feedback here..."
                ></textarea>

                <button 
                    type="submit"
                    className="bg-blue-500 text-white font-medium rounded-md py-2 transition-all duration-300 hover:bg-blue-600 active:scale-95"
                >
                    Submit Feedback
                </button>
            </form>
        </section>
    );
}

export default ReportSection;
