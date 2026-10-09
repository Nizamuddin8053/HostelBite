const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
})[character]);

exports.invoiceCreatedTemplate = ({ name, amount, dueDate }) => `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;color:#1f2937">
  <h2>New HostelBite invoice</h2>
  <p>Hello ${escapeHtml(name)},</p>
  <p>An invoice has been generated for your student account.</p>
  <p><strong>Amount:</strong> ₹${escapeHtml(amount)}</p>
  <p><strong>Due date:</strong> ${escapeHtml(new Date(dueDate).toLocaleDateString("en-IN"))}</p>
  <p>Please sign in to HostelBite and open Payment &amp; Invoice to complete your payment.</p>
</body>
</html>`;
