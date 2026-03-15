export default function Step4() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Step 4: Submit</h3>
            <p className="text-sm text-gray-600">
                You are ready to submit your request. Review the details and click “Submit Request” to complete.
            </p>
            <div className="rounded-lg border border-dashed border-[#E65F2B] p-4 bg-[#FFF4ED] text-sm text-[#873D1E]">
                <p className="font-medium">Checklist:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>All details are filled correctly</li>
                    <li>Amount is accurate</li>
                    <li>Attachments uploaded in next release</li>
                </ul>
            </div>
        </div>
    );
}
