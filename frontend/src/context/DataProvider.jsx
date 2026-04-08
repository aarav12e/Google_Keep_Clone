import { createContext, useState, useEffect, useCallback } from 'react';

export const DataContext = createContext(null);

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const DataProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [archiveNotes, setAcrchiveNotes] = useState([]);
  const [deleteNotes, setDeleteNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // ── Fetch all notes from API on mount ──────
  const fetchNotes = useCallback(async () => {
    try {
      const [activeRes, archivedRes, deletedRes] = await Promise.all([
        fetch(`${API_BASE}/notes?status=active`),
        fetch(`${API_BASE}/notes?status=archived`),
        fetch(`${API_BASE}/notes?status=deleted`),
      ]);

      if (activeRes.ok && archivedRes.ok && deletedRes.ok) {
        const [active, archived, deleted] = await Promise.all([
          activeRes.json(),
          archivedRes.json(),
          deletedRes.json(),
        ]);

        // Map MongoDB _id to id for frontend compatibility
        const mapNote = (n) => ({ ...n, id: n._id });
        setNotes(active.map(mapNote));
        setAcrchiveNotes(archived.map(mapNote));
        setDeleteNotes(deleted.map(mapNote));
        setDbConnected(true);
      }
    } catch (err) {
      console.warn('⚠️ API not available, using local state:', err.message);
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // ── API Helper ─────────────────────────────
  const apiCall = async (method, path, body) => {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(body && { body: JSON.stringify(body) }),
      });
      if (res.ok) return await res.json();
      return null;
    } catch {
      return null;
    }
  };

  // ── Create Note ────────────────────────────
  const addNote = async (noteData) => {
    const created = await apiCall('POST', '/notes', {
      heading: noteData.heading,
      text: noteData.text,
    });

    if (created) {
      setNotes((prev) => [{ ...created, id: created._id }, ...prev]);
    } else {
      // Fallback: local-only
      setNotes((prev) => [noteData, ...prev]);
    }
  };

  // ── Archive Note ───────────────────────────
  const archiveNote = async (note) => {
    const updated = await apiCall('PUT', `/notes/${note._id || note.id}`, {
      status: 'archived',
    });

    setNotes((prev) => prev.filter((n) => n.id !== note.id));
    setAcrchiveNotes((prev) => [
      updated ? { ...updated, id: updated._id } : { ...note, status: 'archived' },
      ...prev,
    ]);
  };

  // ── Unarchive Note ─────────────────────────
  const unarchiveNote = async (note) => {
    const updated = await apiCall('PUT', `/notes/${note._id || note.id}`, {
      status: 'active',
    });

    setAcrchiveNotes((prev) => prev.filter((n) => n.id !== note.id));
    setNotes((prev) => [
      updated ? { ...updated, id: updated._id } : { ...note, status: 'active' },
      ...prev,
    ]);
  };

  // ── Move to Trash ──────────────────────────
  const trashNote = async (note) => {
    const updated = await apiCall('PUT', `/notes/${note._id || note.id}`, {
      status: 'deleted',
    });

    // Remove from wherever it is
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
    setAcrchiveNotes((prev) => prev.filter((n) => n.id !== note.id));
    setDeleteNotes((prev) => [
      updated ? { ...updated, id: updated._id } : { ...note, status: 'deleted' },
      ...prev,
    ]);
  };

  // ── Restore from Trash ────────────────────
  const restoreNote = async (note) => {
    const updated = await apiCall('PUT', `/notes/${note._id || note.id}`, {
      status: 'active',
    });

    setDeleteNotes((prev) => prev.filter((n) => n.id !== note.id));
    setNotes((prev) => [
      updated ? { ...updated, id: updated._id } : { ...note, status: 'active' },
      ...prev,
    ]);
  };

  // ── Permanently Delete ────────────────────
  const permanentlyDelete = async (note) => {
    await apiCall('DELETE', `/notes/${note._id || note.id}`);
    setDeleteNotes((prev) => prev.filter((n) => n.id !== note.id));
  };

  return (
    <DataContext.Provider
      value={{
        notes,
        setNotes,
        archiveNotes,
        setAcrchiveNotes,
        deleteNotes,
        setDeleteNotes,
        addNote,
        archiveNote,
        unarchiveNote,
        trashNote,
        restoreNote,
        permanentlyDelete,
        loading,
        dbConnected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;