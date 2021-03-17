const Database = require('../database/database-mongo');

const db = new Database({'uri': process.env.DB});

class ThreadHandler {
  viewThreads(req, res) {
    const messageBoard = req.params.board.trim();
    db.listAllThreads(messageBoard)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({'error': err});
      });
  };

  createThread(req, res) {
    const messageBoard = req.body.hasOwnProperty('board') ? req.body['board'].trim() : req.params['board'].trim();
    const text = req.body['text'];
    const delete_password = req.body['delete_password'];
    db.createThread(messageBoard, text, delete_password)
      .then(() => {
        res.redirect(`/b/${encodeURIComponent(messageBoard)}`);
      })
      .catch(err => {
        res.json({'error': err});
      });
  };

  reportThread(req, res) {
    const messageBoard = req.params['board'].trim();
    const threadId = req.body['thread_id'];
    db.reportThread(messageBoard, threadId)
      .then((result) => {
        res.send(result);
      })
      .catch(err => {
        res.send(err);
      });
  }

  deleteThread(req, res) {
    const board = req.params['board'].trim();
    const threadId = req.body['thread_id'];
    const deletePassword = req.body['delete_password'];
    db.deleteThread(board, threadId, deletePassword)
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        res.send(err);
      });
  };
}

module.exports = ThreadHandler;