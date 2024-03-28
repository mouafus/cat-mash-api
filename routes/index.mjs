import {Router} from 'express';
import {PrismaClient} from '@prisma/client'

const router = Router();

const prisma = new PrismaClient()

router.get('/', async function (req, res) {
    const cats = await prisma.cat.findMany({
        orderBy: {
            votes: 'desc'
        },
    });

    res.status(200).send(cats);
});

router.post('/:id', async function (req, res) {
    const id = String(req.params.id);
    const cat = await prisma.cat.findUnique({
        where: {id},
    });

    if (!cat) {
        await prisma.cat.create({
            data: {
                id,
                votes: 1
            },
        });
    } else {
        await prisma.cat.update({
            where: {id},
            data: {
                votes: {
                    increment: 1
                }
            },
        });
    }

    res.status(200).send({
        message: 'success',
    });
});

router.get('/total-votes', async function (req, res) {
    const count = await prisma.cat.aggregate({
        _sum: {
            votes: true
        }
    })
    res.status(200).send({data: count._sum.votes});
});

export default router;
