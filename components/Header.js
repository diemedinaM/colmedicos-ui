export default function Header() {
  return (
    <header className="bg-white w-full [grid-area:header] shadow-xs flex justify-between items-center">
      <div>
      </div>
      <div className="flex items-center gap-4">
        <span className="material-icons text-2xl">notifications</span>
        <span className="material-icons w-12 text-2xl">person</span>
      </div>
    </header>
  );
}