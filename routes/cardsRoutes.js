const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const makeFile = require('./cardsUtils');

const adapter = new FileSync('db.json');
const db = low(adapter);
// Set some defaults
db.defaults({ cards: [] }).write();

module.exports = app => {
  app.get('/api/cards', async (req, res) => {
    // console.log('GET cards');
    res.send(
      db
        .get('cards')
        .sortBy('updatedAt')
        .reverse()
        .value()
    );
  });

  app.get('/api/file/:cardsId', (req, res) => {
    const cardsId = req.params.cardsId;
    const fileName = appRoot + '/files/' + cardsId + '.txt';
    res.sendFile(fileName);
  });

  app.get('/api/cards/:cardsId', async (req, res) => {
    const cardsId = req.params.cardsId;
    const result = db
      .get('cards')
      .find({ id: cardsId })
      .value();
    res.send(result);
  });

  app.delete('/api/cards', async (req, res) => {
    const cardsId = req.query.cardsId;
    db
      .get('cards')
      .remove({ id: cardsId })
      .write();

    res.send({ cardsId });
  });

  app.post('/api/cards/makefile', async (req, res) => {
    const cardsId = req.body.cardsId;
    const newfile = cardsId + '.txt';
    const result = db
      .get('cards')
      .find({ id: cardsId })
      .assign({ file: newfile })
      .write();

    // проверка паузы
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    // console.log('this might take some time....');
    // await delay(3000);
    // console.log('done!');

    try {
      await makeFile(result);
    } catch (e) {
      console.log('Error makeFile: ', e);
    }

    res.send({ file: newfile });
  });

  app.post('/api/cards', async (req, res) => {
    const card = req.body;

    db
      .get('cards')
      .push({
        id: shortid.generate(),
        updatedAt: new Date().getTime(),
        ...card
      })
      .write();

    res.send(
      db
        .get('cards')
        .sortBy('updatedAt')
        .reverse()
        .value()
    );
  });

  app.put('/api/cards', async (req, res) => {
    const card = req.body;

    const result = db
      .get('cards')
      .find({ id: card.id })
      .assign({
        updatedAt: new Date().getTime(),
        title: card.title,
        start_number: card.start_number,
        final_number: card.final_number,
        prefix: card.prefix,
        internal_prefix: card.internal_prefix,
        comment: card.comment
      })
      .write();

    res.send(result);
  });
};
