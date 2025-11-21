export default function DebugTailwind() {
  return (
    <div style={{ border: '2px solid red', padding: '20px', margin: '20px' }}>
      <h2>Debug CSS</h2>
      
      {/* Test CSS inline */}
      <div style={{ padding: '20px', backgroundColor: 'lightblue', margin: '10px' }}>
        CSS inline: Ça marche ?
      </div>
      
      {/* Test Tailwind */}
      <div className="p-5 m-5 bg-green-500 text-white">
        Tailwind: p-5 m-5 bg-green-500
      </div>
      
      {/* Test avec !important */}
      <div className="!p-8 !m-8 !bg-purple-500 text-white">
        Tailwind avec !important
      </div>
      
      {/* Test classes simples */}
      <div className="test-class" style={{ color: 'red' }}>
        Classe CSS normale
      </div>
    </div>
  );
}

/*
/* TodoFilters.jsx input principal à copier
 <div className="flex gap-3 mb-4">
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ajouter une nouvelle tâche..."
                    darkMode={darkMode}
                    className="flex-1"
                />
                <Button onClick={handleSubmit} size="lg">
                    <Plus size={20} />
                    Ajouter
                </Button>
            </div>

            TodoFilters.jsx options avancées à copier
            
*/ 