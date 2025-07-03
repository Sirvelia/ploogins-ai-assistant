<?php

namespace Ploogins\Entities;

use Ploogins\Components\SearchesTable;

class SearchEntry
{
	private ?int $id = null;
	private ?string $search_intent_id = null;
	private ?string $time = null;
	private ?string $query = null;
	private ?array $api_args = null;
	private ?array $plugins = null;

	public function __construct(array $data = [])
	{
		if (!empty($data)) {
			$this->id = isset($data['id']) ? (int) $data['id'] : null;
			$this->search_intent_id = $data['search_intent_id'] ?? null;
			$this->time = $data['time'] ?? null;
			$this->query = $data['query'] ?? null;
			$this->api_args = $this->decode_if_json($data['api_args'] ?? null);
			$this->plugins = $this->decode_if_json($data['plugins'] ?? null);
		}
	}

	public function get_id(): ?int
	{
		return $this->id;
	}

	public function get_search_intent_id(): ?string
	{
		return $this->search_intent_id;
	}

	public function set_search_intent_id(string $search_intent_id): void
	{
		$this->search_intent_id = $search_intent_id;
	}

	public function get_time(): ?string
	{
		return $this->time;
	}

	public function set_time(string $time): void
	{
		$this->time = $time;
	}

	public function get_query(): ?string
	{
		return $this->query;
	}

	public function set_query(string $query): void
	{
		$this->query = $query;
	}

	public function get_api_args(): ?array
	{
		return $this->api_args;
	}

	public function set_api_args(array $api_args): void
	{
		$this->api_args = $api_args;
	}

	public function get_plugins(): ?array
	{
		return $this->plugins;
	}

	public function set_plugins(array $plugins): void
	{
		$this->plugins = $plugins;
	}

	public function save(): int
	{
		global $wpdb;
		$table_name = SearchesTable::get_table_name();

		if (empty($this->time)) {
			$this->time = current_time('mysql');
		}

		$data = [
			'search_intent_id' => $this->search_intent_id,
			'time' => $this->time,
			'query' => $this->query,
			'api_args' => $this->api_args ? wp_json_encode($this->api_args) : null,
			'plugins' => $this->plugins ? wp_json_encode($this->plugins) : null,
		];

		if ($this->id) {
			$wpdb->update($table_name, $data, ['id' => $this->id]);
		} else {
			$insert_result = $wpdb->insert($table_name, $data);

			if ($insert_result === false) {
				$error_message = $wpdb->last_error;
				throw new \Exception("Failed to insert search entry: " . esc_html($error_message));
			}

			$this->id = $wpdb->insert_id;
		}

		return $this->id;
	}

	private function decode_if_json($data)
	{
		if (!is_string($data)) {
			return $data;
		}
		$decoded = json_decode($data, true);
		return json_last_error() === JSON_ERROR_NONE ? $decoded : $data;
	}
}
