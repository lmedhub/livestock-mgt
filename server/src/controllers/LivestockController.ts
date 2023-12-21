// controllers/LivestockController.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Livestock } from '../entities/Livestock';
import { validate } from 'class-validator'; // Add this import

export const getAllLivestock = async (req: Request, res: Response) => {
  const livestockRepository = getRepository(Livestock);
  const livestock = await livestockRepository.find();
  res.json(livestock);
};

export const createLivestock = async (req: Request, res: Response) => {
  const livestockRepository = getRepository(Livestock);
  const newLivestock = livestockRepository.create(req.body);

  const errors = await validate(newLivestock);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  await livestockRepository.save(newLivestock);
  res.status(201).json(newLivestock);
};

export const updateLivestock = async (req: Request, res: Response) => {
  const livestockRepository = getRepository(Livestock);
  const { id } = req.params;

  try {
    const livestock = await livestockRepository.findOne({
      where: { id: Number(parseInt(id, 10)) },
    });

    if (!livestock) {
      return res.status(404).json({ message: 'Livestock not found' });
    }

    livestockRepository.merge(livestock, req.body);

    const errors = await validate(livestock);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updatedLivestock = await livestockRepository.save(livestock);
    res.json(updatedLivestock);
  } catch (error) {
    console.error('Error updating livestock:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteLivestock = async (req: Request, res: Response) => {
  const livestockRepository = getRepository(Livestock);
  const { id } = req.params;

  const livestock = await livestockRepository.findOne({
      where: { id: Number(parseInt(id, 10)) },
  });

  if (!livestock) {
    return res.status(404).json({ message: 'Livestock not found' });
  }

  await livestockRepository.remove(livestock);
  res.status(204).json({ message: 'Livestock deleted successfully' });
};
