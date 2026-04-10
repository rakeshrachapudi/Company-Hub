import React, { useEffect, useState } from 'react';

const initialFormData = {
  name: '',
  location: '',
  industry: ''
};

const AddCompanyModal = ({ isOpen, onClose, onAddCompany }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, isSubmitting]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }

    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await onAddCompany(formData);
      setFormData(initialFormData);
      setErrors({});
      onClose();
    } catch (error) {
      setErrors({
        submit: 'Failed to add company. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const inputClassName =
    'w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 backdrop-blur-md transition duration-300 focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-400/40';

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
    >
      <div
        onClick={handleModalClick}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-2xl shadow-[0_30px_80px_rgba(15,23,42,0.45)]"
      >
        {/* Background glow adds premium depth without overusing color */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-0 h-28 w-28 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-32 w-32 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl" />
        </div>

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
              New Entry
            </span>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Add Company
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Add a new company to the directory with a clean, premium glass workflow.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
              Company Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter company name"
              className={inputClassName}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-300">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="location" className="mb-2 block text-sm font-medium text-white">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className={inputClassName}
            />
            {errors.location && (
              <p className="mt-1 text-xs text-rose-300">{errors.location}</p>
            )}
          </div>

          <div>
            <label htmlFor="industry" className="mb-2 block text-sm font-medium text-white">
              Industry
            </label>
            <input
              id="industry"
              name="industry"
              type="text"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Enter industry"
              className={inputClassName}
            />
            {errors.industry && (
              <p className="mt-1 text-xs text-rose-300">{errors.industry}</p>
            )}
          </div>

          {errors.submit && (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {errors.submit}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300/20 bg-indigo-500/20 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:scale-[1.02] hover:bg-indigo-500/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {isSubmitting ? 'Adding...' : 'Add Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;