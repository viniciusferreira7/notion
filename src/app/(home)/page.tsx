import { Editor } from './components/Editor'

export default function Home() {
  return (
    <div className="p-8 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-zinc-900 min-h-screen">
      <div className="bg-white w-[1100px] m-auto rounded-xl min-h-[700px] drop-shadow-sm border border-black/20 overflow-hidden grid grid-cols-[16rem_1fr]">
        <aside className="bg-zinc-50 border-r border-r-zinc-100 p-4">
          <div className="flex gap-2 group">
            <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-red-400" />
            <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-yellow-400" />
            <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-green-400" />
          </div>
        </aside>
        <main className="p-4">
          <Editor />
        </main>
      </div>
    </div>
  )
}
