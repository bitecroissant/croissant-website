export const SginInPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 py-2
        fonts-jinbuti
        bg-gradient-to-r from-red-400 via-orange-500 to-red-600 bg-clip-text text-transparent"
      >
        去登录吧，宝可梦大师
      </h1>

      <div className="p-6 bg-white/80 rounded-lg shadow-lg backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="h-[240px] relative inset-0 bg-gradient-to-br from-blue-400 via-teal-300 to-emerald-400 opacity-90">
            <img
              className="object-contain transition-all duration-300 scale-100 opacity-100 drop-shadow-lg hover:scale-110"
              style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
              src="https://cdn.pokemonjourneytogether.com/official/0025-%E7%9A%AE%E5%8D%A1%E4%B8%98.png"
            />
          </div>
          <p className="fonts-jinbuti text-lg p-5 text-center">皮卡丘</p>
        </div>
      </div>
    </>
  )
}
