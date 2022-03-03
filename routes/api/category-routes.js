const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async(req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
    .then(catDat => res.json(catDat))
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(catDat => res.json(catDat))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
      .then(catDat => {
        if(!catDat) {
          res.status(404).json({ message: 'No category was found.'})
          return
        }
      })
      .catch(err => {
        console.error(err)
        res.status(500).json(err)
      })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(catDat => {
      if(!catDat) {
        res.json(404).json({ message: 'No category was found.'})
        return
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

module.exports = router;
