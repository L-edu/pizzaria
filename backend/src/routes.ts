import {Router, Request, Response} from 'express';

const router = Router();

router.get('/teste', (req: Request, res: Response)=> {
    //return res.json({ok:true})
    //throw new Error('Erro na requisição')
    return res.json({nome: 'Sujeito Pizza'});
});

export {router};