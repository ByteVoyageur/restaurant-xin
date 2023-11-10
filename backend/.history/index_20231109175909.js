const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const app = express()

app.use(cors()) // Activer CORS
app.use(express.json()) // Middleware pour analyser les corps de requête JSON

// Servir des fichiers statiques depuis le dossier 'frontend'
app.use(express.static(path.join(__dirname, '..', 'frontend')))

// API pour retourner le contenu du fichier menu.json
app.get('/api/menu', (req, res) => {
  const menuPath = path.join(__dirname, 'menu.json') // Assurez-vous que ce chemin est correct
  console.log('__dirname est:', __dirname) // Imprimer le répertoire actuel
  console.log('menuPath est:', menuPath) // Imprimer le chemin du fichier menu.json
  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier menu:', err)
      res.status(500).send('Erreur lors de la lecture du fichier menu')
      return
    }
    try {
      const menuData = JSON.parse(data) // Essayer de parser les données JSON
      res.json(menuData)
    } catch (parseErr) {
      console.error("Erreur lors de l'analyse du fichier menu:", parseErr)
      res.status(500).send("Erreur lors de l'analyse du fichier menu")
    }
  })
})

// API pour mettre à jour le fichier menu.json
app.post('/api/update-menu', (req, res) => {
  const menuPath = path.join(__dirname, 'menu.json')
  const newMenuItem = req.body // Obtenir les nouvelles informations de l'article de menu de la demande

  fs.readFile(menuPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier menu:', err)
      res.status(500).send('Erreur lors de la lecture du fichier menu')
      return
    }

    try {
      let menuData = JSON.parse(data)
      menuData.push(newMenuItem) // Ajouter le nouvel article de menu au menu

      // Écrire les données de menu mises à jour dans le fichier
      fs.writeFile(menuPath, JSON.stringify(menuData, null, 2), (writeErr) => {
        if (writeErr) {
          console.error(
            "Erreur lors de l'écriture dans le fichier menu:",
            writeErr
          )
          res.status(500).send("Erreur lors de l'écriture dans le fichier menu")
          return
        }
        res.send('Menu mis à jour avec succès')
      })
    } catch (parseErr) {
      console.error("Erreur lors de l'analyse du fichier menu:", parseErr)
      res.status(500).send("Erreur lors de l'analyse du fichier menu")
    }
  })
})

// Ajouter d'autres interfaces API ici si nécessaire

// Démarrer le serveur sur le port spécifié
const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`)
})
