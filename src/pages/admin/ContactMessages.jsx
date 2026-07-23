import { useState, useEffect, useCallback } from "react";
import { Mail, MailOpen, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import contactApi from "../../api/contactApi";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMessages = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const result = await contactApi.getAll(pageNumber, 20);
      setMessages(result.items || []);
      setTotalPages(result.totalPages || 1);
    } catch (err) {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages(page);
  }, [page, fetchMessages]);

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.isRead) {
      try {
        await contactApi.markAsRead(msg.id);
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
        );
      } catch (err) {
        // silent fail
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    try {
      await contactApi.remove(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected && selected.id === id) {
        setSelected(null);
      }
      toast.success("Message deleted.");
    } catch (err) {
      toast.error("Failed to delete message.");
    }
  };

  function buildMailto(email, subject) {
    return "mailto:" + email + "?subject=Re: " + encodeURIComponent(subject);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-navy mb-6">Contact Messages</h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && messages.length === 0 && (
        <p className="text-gray-500">No messages yet.</p>
      )}

      {!loading && messages.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {messages.map(function (msg) {
            var rowClass =
              "flex items-center justify-between gap-4 px-5 py-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50";
            if (!msg.isRead) {
              rowClass = rowClass + " bg-indigo-50/40";
            }

            var subjectClass = "text-sm truncate";
            if (!msg.isRead) {
              subjectClass = subjectClass + " font-semibold text-navy";
            } else {
              subjectClass = subjectClass + " text-gray-700";
            }

            return (
              <div key={msg.id} onClick={() => openMessage(msg)} className={rowClass}>
                <div className="flex items-center gap-3 min-w-0">
                  {msg.isRead && (
                    <MailOpen size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                  {!msg.isRead && (
                    <Mail size={18} className="text-indigo-600 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className={subjectClass}>{msg.subject}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {msg.name} - {msg.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg.id);
                    }}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-3 py-1.5 text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold text-navy mb-1">
              {selected.subject}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {selected.name} ({selected.email}) -{" "}
              {new Date(selected.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {selected.message}
            </p>
            <a
              href={buildMailto(selected.email, selected.subject)}
              className="inline-block mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
            >
              Reply via Email
            </a>
          </div>
        </div>
      )}
    </div>
  );
}