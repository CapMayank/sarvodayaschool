/** @format */

"use client";

import React, { useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ReorderableItem {
	id: number;
	title: string;
	order: number;
	image?: string;
}

interface ReorderableListProps {
	items: ReorderableItem[];
	onReorder: (items: ReorderableItem[]) => void;
	children: (item: ReorderableItem, index: number) => React.ReactNode;
}

// Sortable Item Component
function SortableItem({
	id,
	item,
	index,
	children,
}: {
	id: string;
	item: ReorderableItem;
	index: number;
	children: React.ReactNode;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`bg-white border-2 rounded-lg p-4 transition-all ${
				isDragging
					? "border-blue-500 shadow-lg bg-blue-50"
					: "border-gray-200 hover:border-gray-300"
			}`}
		>
			<div className="flex items-start gap-4">
				{/* Drag Handle */}
				<div
					{...attributes}
					{...listeners}
					className="flex-shrink-0 cursor-grab active:cursor-grabbing pt-1 hover:text-gray-600"
					title="Drag to reorder"
				>
					<svg
						className="w-6 h-6 text-gray-400"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M8 5a2 2 0 11-4 0 2 2 0 014 0zM8 15a2 2 0 11-4 0 2 2 0 014 0zM14 5a2 2 0 11-4 0 2 2 0 014 0zM14 15a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
				</div>

				{/* Content */}
				<div className="flex-grow">{children}</div>
			</div>
		</div>
	);
}

// Main Component
export default function ReorderableList({
	items,
	onReorder,
	children,
}: ReorderableListProps) {
	const [isLoading, setIsLoading] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			distance: 8,
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over || active.id === over.id) {
			return;
		}

		const oldIndex = items.findIndex(
			(item) => item.id.toString() === active.id
		);
		const newIndex = items.findIndex((item) => item.id.toString() === over.id);

		if (oldIndex === -1 || newIndex === -1) {
			return;
		}

		// Reorder items
		const newItems = arrayMove(items, oldIndex, newIndex);

		// Update order numbers
		const updatedItems = newItems.map((item, index) => ({
			...item,
			order: index,
		}));

		setIsLoading(true);
		onReorder(updatedItems);
		setIsLoading(false);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={items.map((item) => item.id.toString())}
				strategy={verticalListSortingStrategy}
			>
				<div className={`space-y-2 p-2 rounded-lg bg-gray-50`}>
					{items.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<p>No items to reorder</p>
						</div>
					) : (
						items.map((item, index) => (
							<SortableItem
								key={item.id}
								id={item.id.toString()}
								item={item}
								index={index}
							>
								{children(item, index)}
							</SortableItem>
						))
					)}
				</div>
			</SortableContext>
		</DndContext>
	);
}
