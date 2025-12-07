import React, { useState } from 'react';
import api from '../api';
import './EnquiryForm.css';

function EnquiryForm({ productId = null, onDone = () => {} }) {
  const [form, setForm] = useState({ product_id: productId, name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Valid email required';
    if (!form.message.trim()) err.message = 'Message required';
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true); setStatus(null);
    try {
      const payload = { ...form };
      const res = await api.post('/api/enquiries', payload);
      setStatus({ type: 'success', message: 'Enquiry submitted successfully' });
      setForm({ product_id: productId, name: '', email: '', phone: '', message: '' });
      // brief delay then close
      setTimeout(() => onDone(), 900);
    } catch (err) {
      const msg = err?.response?.data?.error?.message || 'Failed to submit';
      setStatus({ type: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      {status && <div className={`form-status ${status.type}`}>{status.message}</div>}

      <label>
        Name
        <input value={form.name} onChange={e => update('name', e.target.value)} />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </label>

      <label>
        Email
        <input value={form.email} onChange={e => update('email', e.target.value)} />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </label>

      <label>
        Phone (optional)
        <input value={form.phone} onChange={e => update('phone', e.target.value)} />
      </label>

      <label>
        Message
        <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={5} />
        {errors.message && <div className="field-error">{errors.message}</div>}
      </label>

      <div className="actions">
        <button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send Enquiry'}</button>
      </div>
    </form>
  );
}

export default EnquiryForm;
