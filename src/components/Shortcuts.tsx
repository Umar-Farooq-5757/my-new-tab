import type React from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

interface Shortcut {
  id: string;
  name: string;
  img: string;
  url: string;
}

const Shortcuts: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newShortcutName, setNewShortcutName] = useState<string>("");
  const [newShortcutURL, setNewShortcutURL] = useState<string>("");
  const [urlError, setUrlError] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [areActionsVisible, setAreActionsVisible] = useState<boolean>(false);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    {
      id: crypto.randomUUID(),
      name: "Hackactime",
      img: "/shortcuts/hackatime.png",
      url: "https://hackatime.hackclub.com",
    },
    {
      id: crypto.randomUUID(),
      name: "Stardance",
      img: "/shortcuts/stardance.png",
      url: "https://stardance.hackclub.com/@UmarFarooq",
    },
    {
      id: crypto.randomUUID(),
      name: "YSWS",
      img: "/shortcuts/ysws.png",
      url: "https://ysws.hackclub.com",
    },
    {
      id: crypto.randomUUID(),
      name: "Slack",
      img: "/shortcuts/slack.png",
      url: "https://app.slack.com",
    },
    {
      id: crypto.randomUUID(),
      name: "Chat GPT",
      img: "/shortcuts/chatgpt.png",
      url: "https://chatgpt.com",
    },
    {
      id: crypto.randomUUID(),
      name: "Hackclub",
      img: "/shortcuts/hackclub.png",
      url: "https://hackclub.com",
    },
  ]);

  const handleSaveShortcut = () => {
    if (!newShortcutName.trim()) return;

    let processedURL = newShortcutURL.trim();

    // Auto-prepend https:// if neither http:// nor https:// is present
    if (!/^https?:\/\//i.test(processedURL)) {
      processedURL = "https://" + processedURL;
    }

    // Regex validation for the URL structure
    const urlRegex =
      /^(https?:\/\/)?([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (!urlRegex.test(processedURL)) {
      setUrlError(
        "Please enter a valid URL (e.g., youtube.com or https://example.com)",
      );
      return;
    }

    setUrlError("");

    if (editingId) {
      const updatedShortcuts = shortcuts.map((shortcut) =>
        shortcut.id === editingId
          ? { ...shortcut, name: newShortcutName, url: processedURL }
          : shortcut,
      );
      setShortcuts(updatedShortcuts);
      localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
    } else {
      const newShortcut: Shortcut = {
        id: crypto.randomUUID(),
        name: newShortcutName,
        img: "/shortcuts/shortcut.png",
        url: processedURL,
      };
      const updatedShortcuts = [...shortcuts, newShortcut];
      setShortcuts(updatedShortcuts);
      localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
    }
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setNewShortcutName("");
    setNewShortcutURL("");
    setUrlError("");
    setAreActionsVisible(false);
  };

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  const editShortcut = (id: string) => {
    setEditingId(id);
    const shortcut = shortcuts.find((s) => s.id === id);
    if (shortcut) {
      setNewShortcutName(shortcut.name);
      setNewShortcutURL(shortcut.url);
    }
    setUrlError("");
    setIsOpen(true);
  };

  const deleteShortcut = (id: string) => {
    const updatedShortcuts = shortcuts.filter((s) => s.id !== id);
    setShortcuts(updatedShortcuts);
    localStorage.setItem("shortcuts", JSON.stringify(updatedShortcuts));
    setAreActionsVisible(false);
  };

  return (
    <div className="text-white flex gap-2 cursor-default w-2/3 flex-wrap justify-center items-center">
      {shortcuts.map((shortcut, index) => (
        <div
          key={shortcut.id || index}
          className="flex flex-col items-center justify-between relative gap-2 hover:bg-white/10 hover:backdrop-blur-md hover:shadow-xl py-2 px-4 transition-all rounded-xs cursor-pointer"
          onClick={() => window.open(shortcut.url)}>
          <img className="size-12" src={shortcut.img} alt="" />
          <p className="text-xs">{shortcut.name}</p>
          {/* actions */}
          {areActionsVisible && (
            <div className="absolute bg-black/50 inset-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  editShortcut(shortcut.id);
                }}
                className="absolute top-1 right-1 bg-white/30 p-1 rounded-full size-1/2 flex items-center justify-center">
                <MdModeEditOutline className="size-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteShortcut(shortcut.id);
                }}
                className="absolute bottom-1 left-1 bg-white/30 p-1 rounded-full size-1/2 flex items-center justify-center">
                <MdDelete className="size-6" />
              </button>
            </div>
          )}
        </div>
      ))}
      <div
        onClick={() => {
          setEditingId(null);
          setNewShortcutName("");
          setNewShortcutURL("");
          setUrlError("");
          setIsOpen(true);
        }}
        className="flex flex-col items-center justify-between gap-2 hover:bg-white/10 hover:backdrop-blur-md hover:shadow-xl py-2 px-4 transition-all rounded-xs cursor-pointer">
        <div className="flex justify-center items-center py-3 px-2">
          <FaPlus className="size-6" />
        </div>
        <p className="text-xs">Add</p>
      </div>
      <div
        onClick={() => setAreActionsVisible(!areActionsVisible)}
        className="flex flex-col items-center justify-between gap-2 hover:bg-white/10 hover:backdrop-blur-md hover:shadow-xl py-2 px-4 transition-all rounded-xs cursor-pointer">
        <div className="flex justify-center items-center py-3 px-2">
          <MdModeEditOutline className="size-6" />
        </div>
        <p className="text-xs">Edit</p>
      </div>

      {/* Popup for adding/editing shortcut */}
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 backdrop-blur-md border border-white/25 w-1/3 min-h-87.5 px-6 py-8 flex flex-col justify-between rounded-xl">
            <h1 className="font-bold text-xl">
              {editingId ? "Edit shortcut" : "Add shortcut"}
            </h1>
            <div className="space-y-3">
              <div>
                <p className="text-sm mb-1">Name</p>
                <input
                  value={newShortcutName}
                  onChange={(e) => setNewShortcutName(e.target.value)}
                  className="w-full border border-white/20 outline-none bg-white/25 px-2 py-1.5 rounded-md text-sm"
                  type="text"
                  placeholder="e.g. Youtube"
                />
              </div>
              <div>
                <p className="text-sm mb-1">URL</p>
                <input
                  value={newShortcutURL}
                  onChange={(e) => {
                    setNewShortcutURL(e.target.value);
                    if (urlError) setUrlError("");
                  }}
                  className={`w-full border outline-none bg-white/25 px-2 py-1.5 rounded-md text-sm ${
                    urlError ? "border-red-400" : "border-white/20"
                  }`}
                  type="text"
                  placeholder="e.g. youtube.com or https://youtube.com"
                />
                {urlError && (
                  <p className="text-red-400 text-xs mt-1">{urlError}</p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={closeModal}
                className="border border-white/20 bg-white/20 px-3 py-1.5 rounded-lg hover:opacity-80 font-semibold text-sm">
                Cancel
              </button>
              <button
                onClick={handleSaveShortcut}
                className="bg-teal-500 text-black px-3 py-1.5 rounded-lg hover:opacity-80 font-semibold text-sm">
                {editingId ? "Save Changes" : "Add Shortcut"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shortcuts;
